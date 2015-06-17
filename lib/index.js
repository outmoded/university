var Hapi = require('hapi');

var server = new Hapi.Server();

var version = require('../package.json').version;


server.connection({
    port: process.env.PORT || 8000
});

server.route({
    method: 'GET',
    path:   '/version',
    config: {
        description: 'Route for supplying the version of the app',
        handler: function (request, reply) {

           return reply({ "version": version });
        }
    }
});

server.start(function () {
    
    console.log('Server started at: ' + server.info.uri);
});

