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