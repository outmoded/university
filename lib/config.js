'use strict';

// Load modules

const Fs = require('fs');


// Declare internals

const internals = {};


exports.tls = {
    key: Fs.readFileSync('./lib/certs/key.key'),
    cert: Fs.readFileSync('./lib/certs/cert.crt'),

    // Only necessary if using the client certificate authentication.
    requestCert: false,

    // Only necessary only if client is using the self-signed certificate.
    ca: []
};
