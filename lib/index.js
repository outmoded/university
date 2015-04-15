// Load modules

var Hapi = require('hapi');
var Hoek = require('hoek');
var Version = require('./version');


// Declare internals

var internals = {};


exports.init = function (port, next) {

  if (typeof port === 'function') {
     next = port;
     port = 8000;
  }

    var server = new Hapi.Server();
    server.connection({ port: port });
    server.register(Version, function (err) {

        if (err) {
          return next(err);
        }

        server.start(function (err) {

            return next(err, server);
        });
    });
};
