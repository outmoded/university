// Load modules

var Hapi = require('hapi');
var Glue = require('glue');


// Declare internals

var internals = {};


exports.init = function (manifest, composerOptions, next) {

    Glue.compose(manifest, composerOptions, function (err, server) {

        if (err) {
            return next(err);
        }

        server.start(function (err) {

            return next(err, server);
        });
    });
};
