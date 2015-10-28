var Hapi = require('hapi');

var server = new Hapi.Server();

server.connection({
  host: 'localhost',
  port: Number(process.argv[2] || 8000)
});

server.route({
  method: 'GET',
  path: '/version',
  handler: function(request, reply) {
    reply(JSON.stringify({version: '0.0.1'}));
  }
});

server.start(function() {});
