/* jshint strict: false */
/* jslint node: true */
'use strict';

/*
 * grunt-phonegap-project
 * https://github.com/CoHyper/grunt-phonegap-project
 *
 * Copyright (c) 2014 svenlang
 * Licensed under the MIT license.
 */

var _ = require('lodash');

module.exports = function(grunt) {

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks
    // require('./lib/set').init(grunt);

    grunt.registerMultiTask('phonegap_project', 'Build a Phonegap application.', function() {

        var done = this.async(),
            UNDEFINED_ANDROID_MIN_SDK = -1,
            isAndroidPlatformAdded = false, // todo check

            // require global options
            options = this.options({
                title: 'MyyApp',
                bundleId: 'de.myylinks.myyapp',
                path: 'phoneGapProject',
                androidMinSdk: UNDEFINED_ANDROID_MIN_SDK,
                version: false
            });

        /**
         * Gets a specific string message
         *
         * @method getMessage
         * @param name {String} The key of the message to get
         * @returns {String} Returns the message
         * @example
         *      getMessage("buildPlatform", "iOS");
         */
        function getMessage(name) {
            name = _.isString(name) ? name : null;
            var arguments_length = arguments.length,
                i = 0,
                output;

            var message = {
                buildPlatform: 'Please wait, we build App Platform: {0}',
                pathNoExists: 'The path no exists: {0}',
                fileNoExists: 'The file no exists: {0}',
                valueDeleteOptionsPathError: 'Check Variable "deleteOptionsPath"'
            };
            output = message[name] || name;

            if (arguments_length > 1) {
                for (i; i < arguments_length; i++) {
                    output = output.replace(i - 1, arguments[i]);
                }
            }

            return output;
        }

        /**
         * Edit the config.xml with user settings
         *
         * @method editConfigXml
         * @param data {Object} The Object to config the config.xml file
         */
        function editConfigXml(data) {
            data = _.isObject(data) ? data : {};
            data.access = _.isArray(data.access) ? data.access : [];

            var file_www_config_xml = options.path + '/www/config.xml',
                dataVersion = _.isString(options.version) && options.version.length > 0 ? options.version : null,
                fileSource,
                minSdkExp = /<preference\ name\=\"android\-minSdkVersion\"\ value\=\"[0-9]+\" \/\>/,
                fileReplace = "";

            // check if file exists
            if (grunt.file.isFile(file_www_config_xml)) {

                // change version
                if (dataVersion) {
                    fileSource = grunt.file.read(file_www_config_xml);
                    grunt.file.write(file_www_config_xml, fileSource.replace(/version\=\"[0-9\.]+"/, 'version="' + dataVersion + '"'));
                }

                // change minsdk
                if (fileSource.match(minSdkExp) && options.androidMinSdk !== UNDEFINED_ANDROID_MIN_SDK) {
                    fileReplace = '<preference name="android-minSdkVersion" value="' + options.androidMinSdk + '" \/>';
                    grunt.file.write(file_www_config_xml, fileSource.replace(minSdkExp, fileReplace));
                }

                // change access
                if (data.access.length > 0) {

                    data.access.forEach(function(url, index) {

                        if (_.isString(url)) {

                            if (index === 1) {

                                // delete default access
                                fileSource = grunt.file.read(file_www_config_xml);
                                grunt.file.write(file_www_config_xml, fileSource.replace(/<access\ origin\=\"\*\"\ \/\>/, ''));
                            }

                            // create new access
                            fileSource = grunt.file.read(file_www_config_xml);
                            grunt.file.write(file_www_config_xml, fileSource.replace(/<\/widget\>/, '\t<access origin="' + url + '" />\n<\/widget>'));

                        }

                    });

                }

            } else {
                grunt.log.warn(getMessage('fileNoExists', file_www_config_xml));
                done(false);
            }
        }

        /**
         * Running "cordova build <platform>" for each platform
         *
         * @method build
         * @param data {Object}
         */
        function build(data) {
            data = _.isObject(data) ? data : {};
            data.platforms = _.isArray(data.platforms) ? data.platforms : [];

            // check if app exists
            if (grunt.file.exists(options.path)) {

                data.platforms.forEach(function(platform) {

                    if (_.isString(platform)) {

                        // check is platforms installed
                        if (grunt.file.exists(options.path + '/platforms/' + platform)) {
                            grunt.log.ok(getMessage('buildPlatform', platform.toUpperCase()));

                            // cordova build <platform>
                            grunt.util.spawn({
                                cmd: 'cordova',
                                args: [
                                    'build',
                                    platform
                                ],
                                opts: {
                                    cwd: options.path
                                }
                            }, onCompleted);
                        }
                    }
                });
            } else {
                grunt.log.warn(getMessage('pathNoExists', options.path));
            }
        }

        /**
         * Running "cordova create <path> <bundleid> <title"
         *
         * @method create
         * @param data {Object} The Object to create a new App
         */
        function create(data) {
            data = _.isObject(data) ? data : {};
            data.deleteOptionsPath = _.isBoolean(data.deleteOptionsPath) ? data.deleteOptionsPath : false;

            if (data.deleteOptionsPath) {

                // delete old app
                if (grunt.file.exists(options.path)) {
                    grunt.file.delete(options.path, { force: true });
                }

                // phonegap create <folder> <bundleid> <title>
                grunt.util.spawn({
                    cmd: 'phonegap',
                    args: [
                        'create',
                        options.path,
                        _.isString(data.bundleId) && data.bundleId.length > 0 ? data.bundleId : options.bundleId,
                        _.isString(data.title) && data.title.length > 0 ? data.title : options.title
                    ]
                }, function(error, result, code) {
                    if (code) {
                        grunt.log.warn(code);
                        grunt.log.warn(result);
                        grunt.log.warn(error);
                        grunt.log.warn(result.stderr);
                    } else {
                        grunt.log.ok(result.stdout);

                        addPlatforms(data.platforms);

                        addPlugins(data.plugins);

                        editConfigXml(data);
                    }
                });
            } else {
                grunt.log.warn(getMessage('valueDeleteOptionsPathError'));
            }
        }

        /**
         * Running "cordova platform add <platform>"
         *
         * @method addPlatforms
         * @param data {Array}
         */
        function addPlatforms(data) {
            data = _.isArray(data) ? data : [];

            data.forEach(function(platform) {

                if (_.isString(platform)) {

                    // check for android SDK
                    if (platform === 'android') {
                        isAndroidPlatformAdded = true; // todo check
                    }

                    // cordova platform add <platform>
                    grunt.util.spawn({
                        cmd: 'cordova',
                        args: [
                            'platform',
                            'add',
                            platform
                        ],
                        opts: {
                            cwd: options.path
                        }
                    }, function (error, result, code) {
                        if (code) {
                            grunt.log.warn(code);
                            grunt.log.warn(result);
                            grunt.log.warn(error);
                            grunt.log.warn(result.stderr);
                            done(false);
                        } else {
                            grunt.log.ok(result.stdout);

                            /*
                             // todo delete
                            // todo check
                            if (isAndroidPlatformAdded && grunt.file.isFile(options.path + '/' + fileAndroidManifest)) {
                                replaceAndroidSdk();
                            }
                             */
                        }
                    });
                }
            });
        }

        /**
         * @method addPlugins
         * @param data {Array}
         */
        function addPlugins(data) {
            data = _.isArray(data) ? data : [];

            data.forEach(function(plugin) {

                if (_.isString(plugin)) {

                    // cordova plugin add <plugin>
                    grunt.util.spawn({
                        cmd: 'cordova',
                        args: [
                            'plugin',
                            'add',
                            plugin
                        ],
                        opts: {
                            cwd: options.path
                        }
                    }, onCompleted);
                }
            });
        }

        /**
         * Eventhandler
         *
         * @method onCompleted
         * @param error
         * @param result
         * @param code
         * @private
         */
        function onCompleted(error, result, code) {
            if (code) {
                grunt.log.warn(code);
                grunt.log.warn(result);
                grunt.log.warn(error);
                grunt.log.warn(result.stderr);
                done(false);
            } else {
                grunt.log.ok(result.stdout);
            }
        }

        // console.log(this.target);
        // console.log(this.data);
        switch(this.target) {
            case 'create':
                create(this.data);
                break;
            case 'build':
                build(this.data);
                break;
            default:
                done(false);
                break;
        }

    });
};