
var Config = require('./config');

var composer = module.exports = {};

composer.manifest = {
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
        './auth-cookie': {},
        'hapi-auth-basic': {},
        'hapi-auth-cookie': {}
    }
};

composer.composeOptions = {
    relativeTo: __dirname
};
