# polygon

Tool for drawing polygons in HTML5 canvas

## Location of files

- Source files (.JS and .LESS) are in the [src/](https://github.com/artbeglaryan/polygon/master/src) folder.
- Grunt tasks files are in the [grunt/](https://github.com/artbeglaryan/polygon/master/grunt) folder.

## Build

To compile polygon by yourself, make sure that you have [Node.js](http://nodejs.org/), [Grunt.js](https://github.com/cowboy/grunt) installed, then:

1) Clone the repository

	git clone https://github.com/artbeglaryan/polygon.git

2) Go inside the polygon folder that you fetched and install Node dependencies

	cd polygon && npm install

3) Run `grunt` to generate the JS and CSS files in the `build` folder and run polygon under [8080 port](http://localhost:8080). It  automatically rebuild files (JS, CSS) when you change files in `src/` or `index.html` 

	grunt
	
Optionally:

- Run `grunt production` to run by using minified and uglified code.
- Run `grunt check` to check code style.
- Run `grunt build` to build project. Files will be in `build/` folder
- Run `grunt dist` to build production version of project with  minified and uglified code. Files will be in `build/` folder

## Usage

Click on canvas will draw a point. Next click will draw a point and connect it with previous point(you will see polyline). Clicking on one of endpoint polyline will transform into polygon. Then you can drag polygon. Also you can change polygon shape by dragging one of it's pick. If you have multiple polygons on one another, you will drag the last selected one. 


## License

Script is licensed under MIT license
