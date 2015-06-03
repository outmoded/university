// Load modules

var Hoek = require('hoek');
var Server = require('./index');
var Path = require('path');
var Config = require('./config/config.js');

// Declare internals

var internals = {};

internals.manifest = {

    connections: [
        {
            port: 8000,
            labels: ['web']
        },
        {
            host: 'localhost',
            port: 8001,
            labels: ['web-tls'],
            tls: Config.tls
        }
    ],
    plugins: {
        './version': {},
        './private': {},
        './home': [{
            'select': ['web', 'web-tls']
        }],
        './auth': {},
        'hapi-auth-basic': {}
    }
};

internals.composeOptions = {
    relativeTo: __dirname
};

Server.init(internals.manifest, internals.composeOptions, function (err, server) {

    Hoek.assert(!err, err);
    console.log('Server started at: ' + server.info.uri);

    server.ext('onRequest', function (request, reply) {

        if (request.connection.info.protocol === 'http') {
            return reply.redirect('https://localhost:8001' + request.url.path).code(301);
        }

        return reply.continue();
    });
});
