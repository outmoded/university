// Load modules

var Hapi = require('hapi');
var Version = require('./version');

exports.init = function (port, next) {

    if (typeof port === 'function' ) {
        next = port;
        port = null;
    }

    var server = new Hapi.Server();
    server.connection({ port: port });
    server.register(Version, function (err) {

        if (err) {
            return next(err, server);
        }

        server.start(function (err) {

            next(err, server);
        });
    });
};
