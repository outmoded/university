var Hapi = require('hapi');
var Version = require('./version');

var internals = {}; // Global variable https://gist.github.com/hueniverse/a06f6315ea736ed1b46d

exports.init = function (port, next) {


    if (typeof port === 'function') {
        next = port;
        port = 8000;
    }

    var server = new Hapi.Server();
    server.connection({ port: port });

    server.register(Version, function (err) {

        if (err) {
            return next(err, server);
        }

        server.start(function (err) {

            return next(err, server);
        });
    });
};
