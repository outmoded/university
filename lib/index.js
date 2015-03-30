// Load modules

var Hapi = require('hapi');
var Version = require('./version');

// Declare internals
// https://gist.github.com/hueniverse/a06f6315ea736ed1b46d#module-classes
var internals = {};

exports.init = internals.init = function (port, next) {

  if (typeof port === 'function') {
    next = port;
    port = 8000;
  }

  var server = new Hapi.Server();
  server.connection({ port: port });

  server.register(Version, function (err) {

    if (err){
      return next(err, server);
    }

    server.start(function startServer(err) {
      return next(err, server);
    });

  });
};
