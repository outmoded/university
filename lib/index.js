// Load modules

var Hapi = require('hapi');
var Hoek = require('hoek');
var Version = require('./version');


// Declare internals

var internals = {};


exports.init = function (data, callback) {

    var server = new Hapi.Server();
    server.connection({ port: Number(data) || 8000 });
    server.register(Version, function (err) {

        if (err) {
            return callback(err, server);
        }

        server.start(function (err) {

           return callback(err, server);

            });

      });
   };




