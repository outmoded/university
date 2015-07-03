// Load modules

var Hoek = require('hoek');
var Server = require('./index');
var Config = require('./config');
var Composer = require('./manifest');

// Declare internals

var internals = {};

Server.init(Composer.manifest, Composer.composeOptions, function (err, server) {

    Hoek.assert(!err, err);

    // Server connections
    var web = server.select('web');
    var webTls = server.select('web-tls');

    // Logging started server
    console.log('Web server started at: ' + web.info.uri);
    console.log('WebTLS server started at: ' + webTls.info.uri);
});