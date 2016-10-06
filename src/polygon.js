/**
 * Created by Artur on 7/26/14.
 */

"use strict";

var Constants = {
    POINT_POSITION_FIX: 5,
    POINT_WIDTH: 10,
    POINT_AREA_WIDTH: 12,
    TRANSPARENT_COLOR: "rgba(255,0,0,0.0000001)"
};

/*************************************/
/*************************************/
/***************OBJECTS***************/
/*************************************/
/*************************************/

/**
 * Constructor for creating Point
 * @param x point center x coordinates
 * @param y point center y coordinates
 * @constructor
 */
function Point(x, y) {
    this.x = x - Constants.POINT_POSITION_FIX;
    this.y = y - Constants.POINT_POSITION_FIX;
    this.centreX = x;
    this.centreY = y;
}

Point.prototype = {
    /**
     * Function for drawing one point with 10px width and height
     */
    drawPoint: function () {
        var that = this,
            x = that.x,
            y = that.y;
        ctx.beginPath();
        ctx.lineWidth = "1";
        ctx.strokeStyle = "#000";
        ctx.fillStyle = "#FFF";
        ctx.clearRect(x - 1, y - 1, Constants.POINT_AREA_WIDTH, Constants.POINT_AREA_WIDTH);
        ctx.moveTo(x, that.y);
        ctx.lineTo(x, y + Constants.POINT_WIDTH);
        ctx.lineTo(x + Constants.POINT_WIDTH, y + Constants.POINT_WIDTH);
        ctx.lineTo(x + Constants.POINT_WIDTH, y);
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
        return that;
    },
    /**
     * Function for drawing dashed line from {this} to point
     * @param point
     */
    drawDashedLine: function (point) {
        var that = this,
            x1 = that.centreX,
            x2 = point.centreX,
            y1 = that.centreY,
            y2 = point.centreY;
        ctx.beginPath();
        ctx.strokeStyle = "#FFF";
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.closePath();
        ctx.stroke();
        var dashLen = 3;
        ctx.beginPath();
        ctx.strokeStyle = "#000";
        ctx.moveTo(x1, y1);
        var dX = x2 - x1;
        var dY = y2 - y1;
        var dashesCount = Math.floor(Math.sqrt(dX * dX + dY * dY) / dashLen);
        var dashX = dX / dashesCount;
        var dashY = dY / dashesCount;
        var q = 0;
        while (q++ < dashesCount) {
            x1 += dashX;
            y1 += dashY;
            ctx[ q % 2 === 0 ? 'moveTo' : 'lineTo' ](x1, y1);
        }
        ctx[ q % 2 === 0 ? 'moveTo' : 'lineTo' ](x2, y2);
        ctx.closePath();
        ctx.stroke();
        return that;
    }
};

/**
 * Constructor for creating Polygon
 * @param points polygon points array
 * @param isCompleted is polygon completed or not
 * @constructor
 */
function Polygon(points, isCompleted) {
    this.points = points ? points : [];
    this.isCompleted = isCompleted ? isCompleted : false;
}

Polygon.prototype = {
    /**
     * Draw all polygon points
     */
    drawAllPoints: function () {
        var that = this;
        for (var i = 0, length = that.points.length; i < length; ++i) {
            that.points[ i ].drawPoint();
        }
        return that;
    },

    /**
     * Function for drawing polygon borders
     */
    drawAllLines: function () {
        var that = this,
            points = that.points;
        for (var i = 0, length = points.length; i < length; ++i) {
            var currentPoint = points[ i ];
            var nextPoint = i + 1 === length ? that.isCompleted ? points[ 0 ] : null : points[ i + 1 ];
            if (nextPoint) {
                currentPoint.drawDashedLine(nextPoint);
            }
        }
        return that;
    },

    /**
     * Function for drawing polygon without points and borders
     * @param color polygon color(optional) if color not passed, draw transparent polygon
     */
    drawPolygonWithoutPointsAndLines: function (color) {
        var that = this,
            points = that.points;
        if (points.length > 0) {
            ctx.beginPath();
            ctx.fillStyle = color ? color : Constants.TRANSPARENT_COLOR;
            var startPoint = points[ 0 ];
            ctx.moveTo(startPoint.centreX, startPoint.centreY);
            for (var i = 1, length = points.length; i < length; ++i) {
                var currentPoint = points[ i ];
                ctx.lineTo(currentPoint.centreX, currentPoint.centreY);
            }
            ctx.lineTo(startPoint.centreX, startPoint.centreY);
            ctx.fill();
            ctx.closePath();
        }
        return that;
    }
};

/*************************************/
/*************************************/
/********METHODS AND VARIABLES********/
/*************************************/
/*************************************/

var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d");
ctx.strokeStyle = "lightgray";

var offsetX = canvas.offsetLeft,
    offsetY = canvas.offsetTop,
    mouseIsDown = false,
    movingElementIndex = -1,
    lastX = 0,
    lastY = 0,
    mouseX,
    mouseY,
    currentIncompletePolygon = new Polygon(),
    polygons = [];


/**
 * Function for drawing all polygons
 */
function drawAllPolygons() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var length = polygons.length;
    var points = currentIncompletePolygon.points;
    if (points.length > 0) {
        currentIncompletePolygon.drawAllLines().drawAllPoints();
    }
    if (length > 0) {
        for (var i = 0; i < length; ++i) {
            polygons[ i ].drawPolygonWithoutPointsAndLines("rgba(255,0,0,0.3)");
        }
        for (i = 0; i < length; ++i) {
            polygons[ i ].drawAllLines();
        }
        for (i = 0; i < length; ++i) {
            points = polygons[ i ].points;
            polygons[ i ].drawAllPoints();
        }
    }
}

/**
 * Handler for click event
 */
function clickHandler() {
    var e = window.event;
    movingElementIndex = -1;
    mouseX = parseInt(e.clientX - offsetX, 10);
    mouseY = parseInt(e.clientY - offsetY, 10);
    if (isPositionInAnotherObject(mouseX, mouseY)) {
        return;
    }
    currentIncompletePolygon.points.push(new Point(mouseX, mouseY));
    drawAllPolygons();
}

/**
 * Handler for double click event
 */
function doubleClickHandler() {
    var e = window.event,
        points = currentIncompletePolygon.points,
        length = points.length;
    movingElementIndex = -1;
    mouseX = parseInt(e.clientX - offsetX, 10);
    mouseY = parseInt(e.clientY - offsetY, 10);
    if (length > 0) {
        if (currentIncompletePolygon.isCompleted || length < 3) {
            return;
        }
        points[ 0 ].drawPoint();
        if (ctx.isPointInPath(mouseX, mouseY)) {
            currentIncompletePolygon.isCompleted = true;
            polygons.push(currentIncompletePolygon);
            currentIncompletePolygon = new Polygon();
            drawAllPolygons();
            return;
        }
        points[ length - 1 ].drawPoint();
        if (ctx.isPointInPath(mouseX, mouseY)) {
            currentIncompletePolygon.isCompleted = true;
            polygons.push(currentIncompletePolygon);
            currentIncompletePolygon = new Polygon();
            drawAllPolygons();
        }

    }
}

/**
 * Handler for mouse down event
 */
function mouseDownHandler() {
    var e = window.event,
        i,
        length = polygons.length;
    mouseX = parseInt(e.clientX - offsetX, 10);
    mouseY = parseInt(e.clientY - offsetY, 10);
    lastX = mouseX;
    lastY = mouseY;
    mouseIsDown = true;
    if (length) {
        for (i = 0; i < length; ++i) {
            if (isPositionInPoints(polygons[ i ].points, mouseX, mouseY)) {
                moveToFirst(polygons, i);
                movingElementIndex = 0;
                return;
            }
        }
        for (i = 0; i < length; i++) {
            if (isPositionInPolygon(polygons[ i ], mouseX, mouseY)) {
                moveToFirst(polygons, i);
                movingElementIndex = 0;
                return;
            }
        }
    }
}

/**
 * Handler for mouse up event
 */
function mouseUpHandler() {
    movingElementIndex = -1;
    mouseIsDown = false;
}

/**
 * Handler for mouse move event
 */
function mouseMoveHandler() {
    var e = window.event;
    if (!mouseIsDown || polygons.length === 0 || movingElementIndex === -1) {
        return;
    }
    mouseX = parseInt(e.clientX - offsetX, 10);
    mouseY = parseInt(e.clientY - offsetY, 10);
    var canvasPosition = canvas.getBoundingClientRect();
    var selectedPolygon = polygons[ movingElementIndex ];
    if (mouseX > canvasPosition.right - offsetY ||
        mouseX < canvasPosition.left - offsetX ||
        mouseY > canvasPosition.bottom - offsetY ||
        mouseY < canvasPosition.top - offsetY) {
        mouseIsDown = false;
        movingElementIndex = -1;
        drawAllPolygons();
        return;
    }
    var isMovedPoint;
    for (var i = 0, length = selectedPolygon.points.length; i < length; ++i) {
        var point = selectedPolygon.points[ i ];
        isMovedPoint = false;
        point.drawPoint();
        if (ctx.isPointInPath(lastX, lastY)) {
            moveToFirst(selectedPolygon.points, i);
            changeOnePointCoordinate(point, mouseX - lastX, mouseY - lastY);
            isMovedPoint = true;
            break;
        }
    }
    if (isMovedPoint) {
        lastX = mouseX;
        lastY = mouseY;
        drawAllPolygons();
        return;
    }
    selectedPolygon.drawPolygonWithoutPointsAndLines(null);
    if (ctx.isPointInPath(lastX, lastY)) {
        changeAllPointCoordinate(selectedPolygon.points, mouseX - lastX, mouseY - lastY);
        lastX = mouseX;
        lastY = mouseY;
    }
    drawAllPolygons();
}

/**
 * Function for changing all points coordinate
 * @param points Array of Point
 * @param xToChange number
 * @param yToChange number
 */
function changeAllPointCoordinate(points, xToChange, yToChange) {
    for (var i = 0, length = points.length; i < length; ++i) {
        var point = points[ i ];
        changeOnePointCoordinate(point, xToChange, yToChange);
    }
}

/**
 * Function for change one point coordinate
 * @param point Point
 * @param xToChange number
 * @param yToChange number
 */
function changeOnePointCoordinate(point, xToChange, yToChange) {
    point.x += xToChange;
    point.centreX += xToChange;
    point.y += yToChange;
    point.centreY += yToChange;
}

/**
 * Function shifting to the first item in array with index
 * @param array Array
 * @param index number index for shifting item
 */
function moveToFirst(array, index) {
    var length = array.length;
    if (length === 0 || index === 0) {
        return;
    }
    if (index < length / 2) {
        while (index-- !== 0) {
            array.push(array.shift());
        }
    } else {
        var count = length - index;
        while (count-- !== 0) {
            array.unshift(array.pop());
        }
    }
}

/**
 * Function for checking is position on another object (Polygon or Point) or not
 * @param x coordinate number
 * @param y coordinate number
 * @returns {boolean}
 */
function isPositionInAnotherObject(x, y) {
    for (var i = 0, length = polygons.length; i < length; ++i) {
        var currentPolygon = polygons[ i ];
        if (isPositionInPolygon(currentPolygon, x, y)) {
            return true;
        }
    }
    return isPositionInPoints(currentIncompletePolygon.points, x, y);
}

/**
 * Function for checking is position on polygon or not
 * @param polygon Polygon
 * @param x coordinate number
 * @param y coordinate number
 * @returns {boolean}
 */
function isPositionInPolygon(polygon, x, y) {
    var points = polygon.points;
    if (points.length > 0) {
        if (polygon.isCompleted) {
            polygon.drawPolygonWithoutPointsAndLines(null);
            if (ctx.isPointInPath(x, y)) {
                return true;
            }
        }
        if (isPositionInPoints(polygon.points, x, y)) {
            return true;
        }
    }
    return false;
}

/**
 * Function for checking is position on point or not
 * @param points Array of points
 * @param x coordinate number
 * @param y coordinate number
 * @returns {boolean}
 */
function isPositionInPoints(points, x, y) {
    for (var i = 0, length = points.length; i < length; ++i) {
        var currentPoint = points[ i ];
        currentPoint.drawPoint();
        if (ctx.isPointInPath(x, y)) {
            return true;
        }
    }
    return false;
}

canvas.addEventListener('click', clickHandler, false);
canvas.addEventListener('dblclick', doubleClickHandler, false);
canvas.addEventListener('mousedown', mouseDownHandler, false);
window.document.body.addEventListener('mouseup', mouseUpHandler, false);
window.document.getElementById("content").addEventListener('mousemove', mouseMoveHandler, false);