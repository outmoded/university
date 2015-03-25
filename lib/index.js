// Load modules

var Hapi = require('hapi');
var Version = require('./version');

// Declare internals

var internals = {};

// Initialization

exports.init = internals.init = function (port, cb) {

    if (typeof port === 'function') {
        cb = port;
        port = 8000;
    }

    var server = new Hapi.Server();
    server.connection({ port: port });
    server.register(Version, function (err) {

        if (err) {
            return cb(err, server);
        }

        server.start(function (err) {
            return cb(err, server);
        });
    });
};
