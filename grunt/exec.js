module.exports = function (grunt, options) {

    return {
        npmUpdate: {
            command: "npm update"
        },
        npmUpdateGlobal: {
            // todo check
            command: "npm update -g"
        }
    };

};