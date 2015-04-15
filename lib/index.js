// Load modules

var Hapi = require('hapi');
var Hoek = require('hoek');
var Version = require('./version');


exports.init = function (port, callback) {

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
