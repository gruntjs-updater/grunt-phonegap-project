# grunt-phonegap-project

[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/plugins/) [![Build Status](https://api.travis-ci.org/CoHyper/grunt-phonegap-project.svg?branch=master)](https://travis-ci.org/CoHyper/grunt-phonegap-project) [![Dependency Status](https://david-dm.org/CoHyper/grunt-phonegap-project.png)](https://david-dm.org/CoHyper/grunt-phonegap-project) [![devDependency Status](https://david-dm.org/CoHyper/grunt-phonegap-project/dev-status.png)](https://david-dm.org/CoHyper/grunt-phonegap-project#info=devDependencies) [![Gittip](http://img.shields.io/gittip/CoHyper.png)](https://www.gittip.com/CoHyper/) [![NPM](https://nodei.co/npm/grunt-phonegap-project.png?downloads=true)](https://nodei.co/npm/grunt-phonegap-project/)

## Jump to Section

* [Getting started](#getting-started)
* [The options](#the-options)
* [The task "create"](#the-task-"create")
* [The task "build"](#the-task-"build")
* [Full example](#full-example)
* [Release History](#release-history)
* [License](#license)

## Getting started
[[Back To Top]](#)

#### NodeJS
[npm](http://nodejs.org/)

#### Grunt
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command.

```
$ npm install grunt-phonegap-project --save-dev
```

It may be enabled inside your Gruntfile with this line of JavaScript:
```
grunt.loadNpmTasks('grunt-phonegap-project');
```

#### Platform SDK
To add support or rebuild a project for any platform, you need from the same machine that [supports the platform's SDK](http://docs.phonegap.com/en/edge/guide_cli_index.md.html).

#### PhoneGap
```
$ npm install phonegap -g
```

#### Cordova
```
$ npm install cordova -g
```

## The options
[[Back To Top]](#)

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

## The task "create"
[[Back To Top]](#)

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
<b>Info:</b> For create a new app need an empty folder.<br />
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

## The task "build"
[[Back To Top]](#)

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

## Full example
[[Back To Top]](#)

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
[[Back To Top]](#)

You can find [all the changelogs here](/docs/changelogs).

### Latest changelog is from v0.1.4.md:

##### 2014-08-15 v0.1.4
* update readme.md
* update travis
* validation options.version
* change "cordova create" to "phonegap create"
* update grunt-contrib-clean devDependencies
* update package.json
* add grunt plugin "load-grunt-config"
* add grunt plugin "grunt-readme-generator"


grunt-jsonlint
grunt-contrib-watch

more task for travis



travis

notifications:
  email:
    - info@weaponxi.com


## License
[[Back To Top]](#)

Copyright (c) 2014 Sven Lang<br />
Licensed under the MIT license.

[![docs examples](https://sourcegraph.com/api/repos/github.com/CoHyper/grunt-phonegap-project/.badges/docs-examples.png)](https://sourcegraph.com/github.com/CoHyper/grunt-phonegap-project) [![dependencies](https://sourcegraph.com/api/repos/github.com/CoHyper/grunt-phonegap-project/.badges/dependencies.png)](https://sourcegraph.com/github.com/CoHyper/grunt-phonegap-project) [![status](https://sourcegraph.com/api/repos/github.com/CoHyper/grunt-phonegap-project/.badges/status.png)](https://sourcegraph.com/github.com/CoHyper/grunt-phonegap-project) [![funcs](https://sourcegraph.com/api/repos/github.com/CoHyper/grunt-phonegap-project/.badges/funcs.png)](https://sourcegraph.com/github.com/CoHyper/grunt-phonegap-project) [![top func](https://sourcegraph.com/api/repos/github.com/CoHyper/grunt-phonegap-project/.badges/top-func.png)](https://sourcegraph.com/github.com/CoHyper/grunt-phonegap-project) [![library users](https://sourcegraph.com/api/repos/github.com/CoHyper/grunt-phonegap-project/.badges/library-users.png)](https://sourcegraph.com/github.com/CoHyper/grunt-phonegap-project) [![authors](https://sourcegraph.com/api/repos/github.com/CoHyper/grunt-phonegap-project/.badges/authors.png)](https://sourcegraph.com/github.com/CoHyper/grunt-phonegap-project) [![xrefs](https://sourcegraph.com/api/repos/github.com/CoHyper/grunt-phonegap-project/.badges/xrefs.png)](https://sourcegraph.com/github.com/CoHyper/grunt-phonegap-project)

