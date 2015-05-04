// Load modules

var Hapi = require('hapi');
var Version = require('./version');
var Private = require('./private');

// Declare internals

var internals = {};


exports.init = function (port, next) {

    var server = new Hapi.Server();
    server.connection({ port: port });

    server.register([ Version, Private ], function (err) {

        if (err) {
            return next(err);
        }

        server.start(function (err) {

            return next(err, server);
        });
    });
};
