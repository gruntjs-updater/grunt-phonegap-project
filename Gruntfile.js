/*
 * grunt-phonegap-project
 * https://github.com/CoHyper/grunt-phonegap-project
 *
 * Copyright (c) 2014 svenlang
 * Licensed under the MIT license.
 */
'use strict';

module.exports = function(grunt) {

    // need for load-grunt-config
        var path = require('path');

    //grunt = _.isObject(grunt) ? grunt : {};

    require('load-grunt-config')(grunt, {
        configPath: path.join(process.cwd(), 'grunt'),
        init: true,
        data: {
            //test: false
        },
        loadGruntTasks: { //can optionally pass options to load-grunt-tasks.  If you set to false, it will disable auto loading tasks.
            pattern: 'grunt-*',
            config: require('./package.json'),
            scope: 'devDependencies'
        },
        postProcess: function(config) {} //can post process config object before it gets passed to grunt
    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    //grunt.loadNpmTasks('grunt-contrib-jshint');
    //grunt.loadNpmTasks('grunt-contrib-clean');


    grunt.registerTask('default', ['clean', 'jshint', 'phonegap_project']);
    grunt.registerTask('clean files', ['clean']);

    // All "phonegap_project" tasks
    grunt.registerTask('1 create new App', ['phonegap_project:create']);
    grunt.registerTask('2 build App', ['phonegap_project:build']);

};