var Hapi = require('hapi');
var package = require('./package.json')

var server = new Hapi.Server();

server.connection({ 
  port: 3000 
});

server.route({
    method: 'GET',
    path: '/version',
    handler: function (request, reply) {
        reply({ version: package.version })
    }
});

server.start(function () {
    console.log('Server running at:', server.info.uri);
});