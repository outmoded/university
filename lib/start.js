// Load modules

var Hoek = require('hoek');
var Server = require('./index');


// Declare internals

var internals = {};
internals.manifest = require('./manifest.json');
internals.options = {
    relativeTo: __dirname
};

Server.init(internals.manifest, internals.options, function (err, server) {

    Hoek.assert(!err, err);
    console.log('Server started at: ' + server.info.uri);
});

