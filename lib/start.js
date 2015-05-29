// Load modules

var Compose = require('./manifest.js'),
    Hoek = require('hoek'),
    Server = require('./index');


// Declare internals

var internals = {};


Server.init(Compose.manifest, Compose.options, function (err, server) {

    Hoek.assert(!err, err);
    console.log('Server started at: ' + server.info.uri);
});






















