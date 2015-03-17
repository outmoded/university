// index.js
// Basic hapijs http server.

var Hapi = require('hapi');

// Utility methods for the hapi ecosystem.
var Hoek = require('hoek');

// Load needed internal settings
var internals = {
    pkg: require('../package.json')
};

// Create new hapijs server object.
var server = new Hapi.Server();


// Configure server to use specific port.
server.connection({ port: 8000 });


// Create a route responding to requests.  
// Visit localhost:8000/version and see response.
server.route({
    method: 'GET',
    path: '/version',
    config: {
        description: 'Returns the version of the server',
        handler: function (request, reply) {

            // Add return before reply to ensure later
            // code is not executed at undefined time.
            return reply({ version:internals.pkg.version });
        }
    }
});


// Start the server.
server.start(function (err) {

    Hoek.assert(!err, err);

    console.log('Server running at:', server.info.uri);
});
