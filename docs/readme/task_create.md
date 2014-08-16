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