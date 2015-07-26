var Hapi = require('hapi');
var Hoek = require('hoek');

var internals = {};
internals.package = require('../package.json');
internals.version = { "version": internals.package.version }
internals.description = "HapiJS University: Assignment 1"

var server = new Hapi.Server();
server.connection({port:8000});

server.route({
    method: 'GET',
    path: '/version',
    config : {
      handler: function (request, reply) {

          return reply(internals.version);
      }
  }
});

server.route({
    method: 'GET',
    path: '/description',
    config : {
      handler: function (request, reply) {

          return reply(internals.description);
      }
    }
});

server.start(function(err) {

  Hoek.assert(!err, err);
  console.log('Server running at:', server.info.uri);
});
