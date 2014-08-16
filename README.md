# grunt-phonegap-project

> Create a [PhoneGap](http://phonegap.com/) Application with config folder, bundleId, platforms, plugins, androidMinSdk, version and domains accesses.

[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/plugins/) [![Build Status](https://api.travis-ci.org/CoHyper/grunt-phonegap-project.svg?branch=master)](https://travis-ci.org/CoHyper/grunt-phonegap-project) [![GitHub version](https://badge.fury.io/gh/CoHyper%2Fgrunt-phonegap-project.svg)](http://badge.fury.io/gh/CoHyper%2Fgrunt-phonegap-project) [![Dependency Status](https://david-dm.org/CoHyper/grunt-phonegap-project.png)](https://david-dm.org/CoHyper/grunt-phonegap-project)
[![devDependency Status](https://david-dm.org/CoHyper/grunt-phonegap-project/dev-status.png)](https://david-dm.org/CoHyper/grunt-phonegap-project#info=devDependencies) [![Gittip](http://img.shields.io/gittip/CoHyper.png)](https://www.gittip.com/CoHyper/)

[![NPM](https://nodei.co/npm/grunt-phonegap-project.png?downloads=true)](https://nodei.co/npm/grunt-phonegap-project/)

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command.

```
$ npm install grunt-phonegap-project --save-dev
```

It may be enabled inside your Gruntfile with this line of JavaScript:

```
grunt.loadNpmTasks('grunt-phonegap-project');
```

## The "phonegap-project" Require

#### Platform SDK
To add support or rebuild a project for any platform, you need from the same machine that [supports the platform's SDK](http://docs.phonegap.com/en/edge/guide_cli_index.md.html).

#### npm
[NodeJS](http://nodejs.org/)

#### PhoneGap
```
$ npm install phonegap -g
```

#### Cordova
```
$ npm install cordova -g
```

## The "phonegap_project" Options
All options are optional.

#### path
Type: `String`, Default: `phoneGapProject`<br />
Path to install the phonegap app.

#### androidMinSdk
Type: `Number`<br />
Changed in `./www/config.xml` after `task.create`.

#### version
Type: `String`<br />
Change the version in the config.xml

## The "phonegap_project" Task

#### create
* `title`<br />
Type: `String`, Default: `MyyApp`

* `bundleId`<br />
Type: `String`, Default: `de.myylinks.myyapp`<br />
Unique identifier Package name for all Android Apps.

* `platforms`<br />
Type: `Array`, Default: `[]`<br />
Install directly with cordova command.

* `plugins`<br />
Type: `Array`, Default: `[]`
Install directly with cordova command.

* `deleteOptionsPath`<br />
Type: `Boolean`, Default: `false`<br />
<b>Info:</b> For create a new app need a empty folder.<br />
<b>WARNING:</b> If `true` they are delete folder of `options.path`.

* `access`<br />
Type `Array`, Default `["*"]`<br />
Define the set of external domains the app is allowed to communicate with. The default value shown above allows it to access any server.

```
grunt.initConfig({
  phonegap_project: {
    options: {},
    create: {
      deleteOptionsPath: true,
      title: 'MyyApp',
      bundleId: 'de.myylinks.myyapp',
      platforms: [
        'ios',
        'android'
      ],
      plugins: [
        'org.apache.cordova.device',
        'org.apache.cordova.console'
      ]
    }
  }
});

grunt.registerTask('phonegap: create new app', ['phonegap_project:create']);
```

#### build
* platforms<br />
Type: `Array`, Default: `[]`

```
grunt.initConfig({
  phonegap_project: {
    options: {},
    build: {
      platforms: [
        'ios',
        'android'
      ]
    }
  }
});

grunt.registerTask('phonegap: build app', ['phonegap_project:build']);
```

## Full Examples
```
grunt.initConfig({
  phonegap_project: {
    options: {
      path: 'myyApp',
      androidMinSdk: 10,
      version: "1.0.0"
    },
    create: {
      deleteOptionsPath: true,
      title: 'MyyApp',
      bundleId: 'de.myylinks.myyapp',
      access: [
        'http://myylinks.de/',
        'http://gruntjs.com/',
        'http://github.com/'
      ],
      platforms: [
        'ios',
        'android'
      ],
      plugins: [
        'org.apache.cordova.camera',
        'org.apache.cordova.battery-status'
      ]
    },
    build: {
      platforms: [
        'ios',
        'android'
      ]
    }
  }
});

grunt.registerTask('phonegap: create new app', ['phonegap_project:create']);
grunt.registerTask('phonegap: build app', ['phonegap_project:build']);
```

## Release History

[All Releases history are here](https://github.com/CoHyper/grunt-phonegap-project/tree/master/docs/reloeases)

## License
Copyright (c) 2014 svenlang<br />
Licensed under the MIT license.