// Load modules

var Hapi = require('hapi');
var Hoek = require('hoek');
var Version = require('./version');


// Declare internals

var internals = {};


exports.init = function (port, callback) {

    var server = new Hapi.Server();
    server.connection({ port: port});
    server.register(Version, function (err) {

        Hoek.assert(!err, err);
        server.start(function (err) {

            Hoek.assert(!err, err);
            console.log('Server started at: ' + server.info.uri);
        });
    });
};
