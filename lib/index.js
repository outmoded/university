// Load modules

var Hapi = require('hapi');
var Hoek = require('hoek');
var Version = require('./version');


// Declare internals

var internals = {};


exports.init = function (port, callback) {

    if (typeof port === 'function') {
      callback = port;
      port = undefined;
    }

    var server = new Hapi.Server();
    server.connection({ port: port || 8000 });
    server.register(Version, function (err) {

        if (err) {
            return callback(err);
        }
        
        server.start(function (err) {

            return callback(err, server);
        });
    });
};
