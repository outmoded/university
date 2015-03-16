var Hapi = require('hapi');
var Package = require('../package.json');

// Create a server with a host and port

var server = new Hapi.Server();
server.connection({
        host: 'localhost',
        port: 8000
});

// Add the route

server.route({
    method: 'GET',
    path:'/version',
    handler: function (request, reply) {
    reply({ version: Package.version });
    }
});

// Start the server

server.start(function (err) {

    console.log('Server running at:', server.info.uri);
});

