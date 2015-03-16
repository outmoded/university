var Hapi = require('hapi');
var pkg  = require('./package.json');

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
       reply({ version: pkg.version });
    }
});

// Start the server
server.start(function () {
        console.log('Server running at:',
                    server.info.uri);
    }
);

