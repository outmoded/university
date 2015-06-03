// Load modules

var Hoek = require('hoek');
var Server = require('./index');


// Declare internals

var internals = {};
internals.defaultManifest = {
    connections: [
	{ port: 8000 }
    ]
};

Server.init(internals.defaultManifest, function (err, server) {

    Hoek.assert(!err, err);
    console.log('Server started at: ' + server.info.uri);
});

