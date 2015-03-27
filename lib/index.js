// Load modules

var Hapi = require('hapi');
var Version = require('./version');

// Initialization

exports.init = function (port, cb) {

    if (typeof port === 'function') {
        cb = port;
        port = null;
    }

    var server = new Hapi.Server();
    server.connection({ port: port || 8000 });
    server.register(Version, function (err) {

        if (err) {
            return cb(err, server);
        }

        server.start(function (err) {
            return cb(err, server);
        });
    });
};
