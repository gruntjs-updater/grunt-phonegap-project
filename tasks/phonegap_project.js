/* jshint strict: false */
/* jslint node: true */
"use strict";

/*
 * grunt-phonegap-project
 * https://github.com/CoHyper/grunt-phonegap-project
 *
 * Copyright (c) 2014 Sven Lang
 * Licensed under the MIT license.
 */
if (!module) {
    var module;
}

/**
 * Lodash object
 *
 * @attribute _
 * @private
 */
var _ = require('lodash');


module.exports = function(grunt) {

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks
    // require('./lib/set').init(grunt);

    grunt.registerMultiTask('phonegap_project', 'Create a PhoneGap application.', function() {

        var
            /**
             *
             */
            done = this.async(),

            /**
             *
             */
            UNDEFINED_ANDROID_MIN_SDK = -1,

            /**
             *
             */
            UNDEFINED_ANDROID_TARGET_SDK = -1,

            /**
             *
             */
            isAndroidPlatformAdded = false,

            /**
             * require global options
             *
             * @attribute options {Object}
             * @attribute options.title {String}
             * @attribute options.bundleId {String}
             * @attribute options.path {String}
             */
            options = this.options({
                title: 'MyyApp',
                bundleId: 'de.myylinks.myyapp',
                path: 'phoneGapProject',
                androidMinSdk: UNDEFINED_ANDROID_MIN_SDK,
                androidTargetSdk: UNDEFINED_ANDROID_TARGET_SDK,
                version: null
            });

        /**
         * Gets a specific string message
         *
         * @method getMessage
         * @param name {String} The key of the message to get
         * @returns {String} Returns the message
         * @private
         * @example
         *      getMessage("buildPlatform", "iOS");
         */
        function getMessage(name) {
            name = _.isString(name) ? name : null;

            var argumentsLength = arguments.length,
                i = 0,
                output,
                message = {
	                buildPlatform: 'Please wait, build App Platform: {0}',
	                pathNoExists: 'The path no exists: {0}',
	                fileNoExists: 'The file no exists: {0}',
	                valueDeleteOptionsPathError: 'Check Variable "deleteOptionsPath"'
	            };

            output = message[name] || name;

            if (argumentsLength > 1) {
                for (i; i < argumentsLength; i++) {
                    if (_.isString(arguments[i])) {
                        output = output.replace((i - 1).toString(), arguments[i]);
                    }
                }
            }

            return output;
        }

        /**
         * Edit the config.xml with user settings
         *
         * @method editConfigXml
         * @param data {Object} The Object to config the config.xml file
         * @private
         */
        function editConfigXml(data) {
            data = _.isObject(data) ? data : {};
            data.access = _.isArray(data.access) ? data.access : [];

            var file_www_config_xml = options.path + '/config.xml',
                dataVersion = _.isString(options.version) && options.version.length > 0 && (options.version.match(/[\d]+\.[\d]+\.[\d]+/) || options.version.match(/[0-9]+\.[0-9]+\.[0-9]+/)) ? options.version : null,
                minSdkExp = /<preference\ name\=\"android\-minSdkVersion\"\ value\=\"[0-9]+\" \/\>/,
                fileSource,
                fileReplace = "";

            // check if file exists
            if (grunt.file.isFile(file_www_config_xml)) {

                // change version
                if (dataVersion) {
                    fileSource = grunt.file.read(file_www_config_xml);
                    grunt.file.write(
                        file_www_config_xml,
                        fileSource.replace(/version\=\"[0-9\.]+"/, 'version="' + dataVersion + '"')
                    );
                }

                // change minSdk
                if (fileSource.match(minSdkExp) && options.androidMinSdk !== UNDEFINED_ANDROID_MIN_SDK) {
                    fileSource = grunt.file.read(file_www_config_xml);
                    grunt.file.write(
                        file_www_config_xml,
                        fileSource.replace(
                            minSdkExp,
                            '<preference name="android-minSdkVersion" value="' + options.androidMinSdk + '" \/>'
                        )
                    );
                }

                // change access
                data.access.forEach(function(url, index) {

                    if (_.isString(url)) {

                        fileSource = grunt.file.read(file_www_config_xml);

                        if (index === 1) {

                            // delete default access and update
                            grunt.file.write(
                                file_www_config_xml,
                                fileSource.replace(
                                    /<access\ origin\=\"\*\"\ \/\>/,
                                    '<access origin="' + url + '" />'
                                )
                            );

                        } else {

                            // create all other accesses
                            grunt.file.write(
                                file_www_config_xml,
                                fileSource.replace(
                                    /<\/widget\>/,
                                    '\t<access origin="' + url + '" />\n<\/widget>'
                                )
                            );
                        }
                    } else {
                        // todo error
                    }
                });

            } else {
                grunt.log.warn(getMessage('fileNoExists', file_www_config_xml));
                done(false);
            }
        }


        function editManifestXml() {
            // todo : next update
            // need update version & minSdk extra
            /*
            var file_platform_android_manifest_xml = options.path + "/platforms/android/AndroidManifest.xml",
                fileSource,
                minSdk = options.androidMinSdk && options.androidMinSdk !== UNDEFINED_ANDROID_MIN_SDK ? options.androidMinSdk : null,
                targetSdk = options.androidTargetSdk && options.androidTargetSdk !== UNDEFINED_ANDROID_TARGET_SDK ? options.androidTargetSdk : null;

            // check if file exists
            if (isAndroidPlatformAdded && grunt.file.isFile(file_platform_android_manifest_xml)) {

                //console.log("yes, exists");

                fileSource = grunt.file.read(file_platform_android_manifest_xml);

                if (minSdk || targetSdk) {

                    grunt.file.write(
                        file_platform_android_manifest_xml,
                        fileSource.replace(
                            /<uses\-sdk\ android\:minSdkVersion\=\"[0-9]+$1\"\ android\:targetSdkVersion\=\"[0-9]+$2\"\ \/\>/,
                            '<uses-sdk android:minSdkVersion="' + minSdk ? minSdk : $1 + '" android:targetSdkVersion="' + targetSdk ? targetSdk : $2 + '" />'
                        )
                    );
                }

            }
             */
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
         * Running "phonegap create <path> <bundleid> <title"
         *
         * @method create
         * @param data {Object} The Object to create a new App
         */
        function create(data) {
            /**
             * TODO : check can split bundle id
             */
            data = _.isObject(data) ? data : {};
            data.deleteOptionsPath = _.isBoolean(data.deleteOptionsPath) ? data.deleteOptionsPath : false;
            data.bundleId = _.isString(data.bundleId) && data.bundleId.length > 0 ? data.bundleId : options.bundleId;
            data.title = _.isString(data.title) && data.title.length > 0 ? data.title : options.title;
            data.plugins = _.isArray(data.plugins) ? data.plugins : [];
            data.platforms = _.isArray(data.platforms) ? data.platforms : [];

            if (data.deleteOptionsPath) {

                // check if app exists
                if (grunt.file.exists(options.path)) {

                    // delete old app
                    grunt.file.delete(options.path, { force: true });
                }

                // phonegap create <folder> <bundleid> <title>
                grunt.util.spawn({
                    cmd: 'phonegap',
                    args: [
                        'create',
                        options.path,
                        data.bundleId,
                        data.title
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

                        editManifestXml();
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
         * @private
         */
        function addPlatforms(data) {
            data = _.isArray(data) ? data : [];

            data.forEach(function(platform) {

                if (_.isString(platform)) {

                    // check for android manifest
                    if (platform === 'android') {
                        isAndroidPlatformAdded = true;
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
                    },

// TODO : check can insert function onCompleted()
                    function (error, result, code) {
                        if (code) {
                            grunt.log.warn(code);
                            grunt.log.warn(result);
                            grunt.log.warn(error);
                            grunt.log.warn(result.stderr);
                            done(false);
                        } else {
                            grunt.log.ok(result.stdout);
                        }
                    });
                }
            });
        }

        /**
         * @method addPlugins
         * @param data {Array}
         * @private
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
         * EventHandler
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