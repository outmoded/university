// Load modules

var Hapi = require('hapi');
var Customers = require('./customers')

// Declare internals

var internals = {};


exports.init = function (port, next) {

    var server = new Hapi.Server();
    server.connection({ port: port });

    server.register(Customers, function (err) {

        if (err) {
            return next(err);
        }

        server.start(function (err) {

            return next(err, server);
        });
    });
};



