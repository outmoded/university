var fs = require('fs');


var config = module.exports = {};


config.tls = {
    key: fs.readFileSync('./lib/certs/server.key'),     // Path to key
    cert: fs.readFileSync('./lib/certs/server.crt'),    // Path to Certificate

    // This is necessary only if using the client certificate authentication.
    requestCert: true,

    // This is necessary only if the client uses the self-signed certificate.
    ca: []
};
