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
