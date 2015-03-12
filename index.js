var Hapi = require('hapi');
var packageJSON = require('./package.json');

var server = new Hapi.Server();

server.connection({ port: 8000 });

server.route({
    method: 'GET',
    path: '/version',
    config: {
        handler: function (request, reply) {
            return reply({ version: packageJSON.version });
        }
    }
});

server.start(function () {
    console.log('Server running at:', server.info.uri);
});