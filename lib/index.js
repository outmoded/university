// Load modules

var Hapi = require('hapi');
var Private = require('./private');
var Version = require('./version');


// Declare internals

var internals = {};


exports.init = function (port, next) {

    var server = new Hapi.Server();
    server.connection({ port: port });

    server.register([Private, Version], function (err) {

        if (err) {
            return next(err);
        }

        server.start(function (err) {

            return next(err, server);
        });
    });
};
