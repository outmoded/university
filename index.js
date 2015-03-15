var Hapi = require('hapi');
var package = require('./package');

var server = new Hapi.Server();
server.connection({
  host: 'localhost',
  port: 8000
});

server.route({
  method: 'GET',
  path: '/version',
  handler: function(request, reply) {
    reply({
      version: package.version
    });
  }
});

server.start();