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