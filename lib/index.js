// Load modules

var Hapi = require('hapi');
var Version = require('./version');


exports.init = function (port, cb) {

    var server = new Hapi.Server();
    server.connection({ port: port });
    server.register(Version, function (err) {

        if (err) { return cb(err, server); }
        server.start(function(err) {

            return cb(err, server);
        });
    });
};
