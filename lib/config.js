var Fs = require('fs');

var config = module.exports = {};

// Configuring TLS
config.tls = {
    key: Fs.readFileSync('./lib/certs/key.key'),
    cert: Fs.readFileSync('./lib/certs/cert.crt'),

    // Only necessary if using the client certificate authentication.
    requestCert: true,

    // Only necessary only if client is using the self-signed certificate.
    ca: []
};

config.monitor = {
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

