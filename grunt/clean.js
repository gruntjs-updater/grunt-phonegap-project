module.exports = function (grunt, options) {

    // Before generating any new files, remove any previously-created files.

    return {
        tests: [
            'tmp',
            // default folder
            'phoneGapProject',
            // settings folder
            'newapp',
            // default folder
            'phoneGapProject',
            // settings folder
            'myyApp'
        ]
    };

};