// Load modules

var Hapi = require('hapi');
var Hoek = require('hoek');
var Version = require('./version');


// Declare internals

var internals = {};

exports.Version = Version;

// Initialization

exports.init = function (port, cb) {

    var server = new Hapi.Server();

    if (!port) {
        port = 8000;
    }


    server.connection({ port: port });


    server.register(Version, function (err) {

        if(err){
            return cb(err, server); 
        }

        server.start(function (err) {

            return cb(err, server);
        });
    });
};


