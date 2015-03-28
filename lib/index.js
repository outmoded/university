// Load modules

var Hapi = require('hapi');
var Hoek = require('hoek');
var Version = require('./version');

// Declare internals

var internals = {
    port: 8000
};

exports.init = function (port, callback) {

    if (typeof port === 'function') {
        callback = port;
        port = internals.port;
    }

    var server = new Hapi.Server();
    server.connection({ port: port });
    server.register(Version, function (err) {

        if (err) {
            return callback(err, server);
        }

        server.start(function (err) {

           return callback(err, server);

        });
    });
};
