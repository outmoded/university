var hapi = require('hapi'),
  server = new hapi.Server(),
  packageJson = require('./package.json');

server.connection({
  host: '0.0.0.0',
  port: 8080
});

server.route({
  method: "GET",
  path: "/version",
  config: {
    handler: function(request, reply) {
      reply({
        version: packageJson.version
      })
    }
  }
});

server.start();
