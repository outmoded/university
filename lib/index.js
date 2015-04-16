var Hapi = require('hapi');
var Version = require('./version');

var internals = {}; // Global variable https://gist.github.com/hueniverse/a06f6315ea736ed1b46d

exports.init = function (port, next) {


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
