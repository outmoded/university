// Load modules

var Config = require('./config'),
    Hoek = require('hoek'),
    Server = require('./index'),
    Url = require('url');

// Declare internals
var internals = {};

internals.manifest = {
    connections: [
        {
            host: Config.host,
            port: Config.http.port,
            labels: ['web']
        },
        {
            host: Config.host,
            port: Config.tls.port,
            labels: ['web-tls'],
            tls: Config.tls
        }
    ],
    plugins: {
        './version': {},
        './private': {},
        './home': {},
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
            return reply.redirect(Url.format({
                protocol: 'https',
                hostname: Config.host,
                pathname: request.url.path,
                port: Config.tls.port
            }));
        }

        return reply.continue();
    });
});
