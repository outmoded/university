var Hapi    = require('hapi');
var pkgjson = require('./../package.json');
var server  = new Hapi.Server();

server.connection({ port: 8000 });

server.route({
  method: 'GET',
  path: '/version',
  handler: function (request, reply) {
    reply({ version: pkgjson.version });
  }
});

server.start(function () {
  console.log('Server running, listening on port:', server.info.port);
});
