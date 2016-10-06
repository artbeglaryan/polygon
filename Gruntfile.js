/*jslint node: true */
"use strict";

require('babel/register');

module.exports = function (grunt) {
    var path = require('path');

    // source module listing
    var srcModules = [
        'src/polygon.js'
    ];

    require('load-grunt-config')(grunt, {
        data: {
            src: srcModules
        },
        jitGrunt: {
            customTasksDir: path.resolve('grunt/tasks')
        }
    });
};
