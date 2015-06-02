// Load modules

var Hoek = require('hoek');
var Server = require('./index');
var Path = require('path');

// Declare internals

var internals = {};

internals.manifest = {
    connections: [
        {
            port: 8000,
            labels: ['web']
        },
        {
            port: 8001,
            labels: ['web-tls'],
            routes: {
                security: {
                    hsts: {
                        maxAge: 1000 * 60 * 60 * 24 * 30,
                        includeSubdomains: true
                    },
                    xframe: true
                }
            }
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

    if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {

        this.server.ext('onRequest', function (request, next) {

            if (request.headers['x-forwarded-proto'] !== 'https') {
                request.originalPath = request.path;
                request.setUrl('/redirect');
            }
            next();
        });

        this.server.route([{
            method: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
            path: '/redirect',
            handler: function (request, reply) {

                var host = request.headers.host;
                reply().redirect('https://' + host + request.originalPath);
            }
        }]);
    }
});
