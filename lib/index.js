// Load modules
var Glue = require('glue');
var Hoek = require('hoek');
var Manifest = require('../config/manifest');

// Declare internals

var internals = {};
internals.composeOptions = {
    relativeTo: __dirname
};

exports.init = function (options, next) {

    var config = Hoek.applyToDefaults(Manifest, options);

    Glue.compose(config, internals.composeOptions, function (err, server ) {

        if (err) {
            return next(err);
        }

        server.start(function (err) {

            return next(err, server);
        });
    });
};
