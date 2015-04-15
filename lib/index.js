// Load modules

var Hapi = require('hapi');
var Version = require('./version');

// Declare internals

var internals = {};


exports.init = internals.init = function (port, next) {

    var defaultPort = 8000;
    //support both init(port, cb) & init(cb)
    if ( typeof port === 'function' ) {
        next = port;
        port = defaultPort;
    }
    if ( port === undefined || port === null ) {
        port = defaultPort;
    }
    var server = new Hapi.Server();
    server.connection({ port: port });
    server.register(Version, function (err) {

        if (err) {
            return next(err);
        }
        server.start(function (err) {

            return next(err, server);
        });
    });
};
