module.exports = function (grunt, options) {

    return {
        all: [
            'Gruntfile.js',
            'tasks/*.js'
        ],
        options: {
            "curly": true,
            "eqeqeq": true,
            "immed": true,
            "latedef": true,
            "newcap": true,
            "noarg": true,
            "sub": true,
            "undef": true,
            "boss": true,
            "eqnull": true,
            "node": true
        }
    };

};