// Load modules

var Glue = require('glue');
var Hoek = require('hoek');


// Declare internals

var internals = {};
internals.defaultManifest = {
    plugins: {
        './private': {},
        './version': {},
        './home': {}
    }
};

internals.composeOptions = {
    relativeTo: __dirname
};


exports.init = function (options, next) {

    var config = Hoek.applyToDefaults(internals.defaultManifest, options);

    Glue.compose(config, internals.composeOptions, function (err, server) {

        if (err) {
            return next(err);
        }

        server.start(function (err) {

            return next(err, server);
        });
    });
};
