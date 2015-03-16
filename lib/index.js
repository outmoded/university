var Hapi = require('hapi');
var internals = require('../package.json');

internals.response = { version: internals.version };

var server = new Hapi.Server();
server.connection({ port: 8000 });

server.route({
    method: 'GET',
    path: '/version',
    handler: function (request, reply) {
        reply(internals.response)
          .type('application/json');
    }
});

server.start(function () {
    console.log('Server running at:', server.info.uri);
});
