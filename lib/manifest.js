
var Config = require('./config');

var internals = {};

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
            labels: ['web-tls', 'api'],
            tls: Config.tls
        }
    ],
    plugins: {
        './version': [{
            'select': ['web', 'web-tls']
        }],
        './home': [{
            'select': ['web', 'web-tls']
        }],
        './api/login': [{
            'select': ['api']
        }],
        './auth-cookie': {},
        'hapi-auth-cookie': {},
        'crumb': Config.crumb,
        'good': Config.monitor,
        'lout': {}
    }
};

composer.composeOptions = {
    relativeTo: __dirname
};

internals.goodConfigs = {
    opsInterval: 1000,
    reporters: [{
        reporter: require('good-console'),
        events: { log: '*', response: '*' }
    }, {
        reporter: require('good-file'),
        events: { ops: '*' },
        config: './test/fixtures/monitor_log'
    }, {
        reporter: 'good-http',
        events: { ops: '*', log: '*', response: '*' },
        config: {
            endpoint: 'http://localhost:3000',
            wreck: {
                headers: { 'x-api-key': 12345 }
            }
        }
    }]
};
