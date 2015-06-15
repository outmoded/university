// Load modules

var Hoek = require('hoek');
var Server = require('./index');
var Config = require('./config');

// Declare internals

var internals = {};

internals.manifest = {
    connections: [
        {
            host: 'localhost',
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

    // Server connections
    var web = server.select('web');
    var webTls = server.select('web-tls');

    // Logging started server
    console.log('Web server started at: ' + web.info.uri);
    console.log('WebTLS server started at: ' + webTls.info.uri);
});
