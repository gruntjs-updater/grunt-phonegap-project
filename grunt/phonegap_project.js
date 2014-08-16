module.exports = function (grunt, options) {

    /**
     * Creating local and with Travis without any changes
     * TODO : perhaps other solution
     *
     * @method getTaskValues
     * @param key {String} The key of Array to get
     * @return {Array}
     */
    function getTaskValues(key) {
        key = key ? key : null;

        // creating with Travis - add all cordova plugins, but they are no supported multilanguage (cant install iOS and/or Android SDK)
        var jsonFile = 'tasks/options/options_travis.json',
            obj;

        // check if file local exists
        if (grunt.file.isFile('../grunt_dummy.js')) {
            grunt.log.ok('###################');
            grunt.log.ok('#  "DEVELOPMENT"  #');
            grunt.log.ok('###################');

            // local create with own file
            jsonFile = 'tasks/options/options_development.json';
        }
        obj = grunt.file.readJSON(jsonFile);

        return obj && key && obj[key] ? obj[key] : [];
    }

    return {
        options: {
            //path: 'newapp',
            androidMinSdk: 10,
            version: "2.3.4"
        },
        create: {
            title: 'NewApp',
            bundleId: 'de.myylinks.newapp',
            platforms: getTaskValues("platforms"),
            plugins: getTaskValues("plugins"),
            deleteOptionsPath: true,
            access: [
                "http://myylinks.de",
                "http://www.myylinks.de"
            ]
        },
        build: {
            platforms: getTaskValues("platforms")
        }
    }

};