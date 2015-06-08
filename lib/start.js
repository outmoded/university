// Load modules

var Config = require('./config'),
    Hoek = require('hoek'),
    Server = require('./index');

// Declare internals
var internals = {};

internals.manifest = {
    connections: [
        {
            host: Config.host,
            port: Config.http.port,
            labels: 'web'
        },
        {
            host: Config.host,
            port: Config.tls.port,
            labels: ['web-tls'],
            tls: Config.tls
        }
    ],
    plugins: {
        './version': [{
            'select': ['web', 'web-tls']
        }],
        './private': [{
            'select': ['web', 'web-tls']
        }],
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
});
