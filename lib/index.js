// Load modules

var Hapi = require('hapi');
var Hoek = require('hoek');
var Version = require('./version');


// Declare internals

var internals = {};

exports.init = function(portToUse, callback) {

    if (typeof portToUse === 'function') {
        callback = portToUse;
        portToUse = undefined;
    }

    var server = new Hapi.Server();
    server.connection({ port: portToUse || 8000 });
    server.register(Version, function (err) {

        server.start(function(err) {

            return callback(err, server);
        });
    });
};
