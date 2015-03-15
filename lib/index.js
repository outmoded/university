var Hapi = require('hapi');
var server  = new Hapi.Server();
var pkg = require('../package.json');
server.connection({ port: 8000 });

server.route({
  method: 'GET',
  path: '/version',
  handler: function (request, reply) {
    reply({ version: pkg.version });
  }
});

server.start(function () {
  console.log('Server version: ' + pkg.version + '. Port: ' + server.info.port + '.');
});