// Load modules

var Hapi = require('hapi');
var Hoek = require('hoek');
var Version = require('./version');


// Declare internals

var internals = {};


// Initialization

exports.init = function (port, cb) {

    var server = new Hapi.Server();

    if (!port) {
        port = 8000;
    }


    server.connection({ port: port });


    server.register(Version, function (err) {

        Hoek.assert(!err, err);

        server.start(function (err) {

            Hoek.assert(!err, err);
            return cb(err, server);
        });
    });
};


