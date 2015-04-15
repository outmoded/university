// Load modules

var Hapi = require('hapi');
var Hoek = require('hoek');
var Version = require('./version');


// Declare internals

var internals = {};


exports.init = function (port, callback) {

    if (!callback) {
      callback = port;
      port = 8000;
    }

    var server = new Hapi.Server();
    server.connection({ port: port });
    server.register(Version, function (err) {

        Hoek.assert(!err, err);
        server.start(function (err) {

            return callback(err, server);
        });
    });
};
