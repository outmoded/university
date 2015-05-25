// Load modules

var Hoek = require('hoek');
var Server = require('./index');

// Declare internals

var internals = {};

internals.manifest = {
    connections: [
        {
            port: 3000
        }
    ],
    plugins: {
        './version': {},
        './private': {},
       
       
    }
};

internals.composeOptions = {
    relativeTo: __dirname
};

Server.init(internals.manifest, internals.composeOptions, function (err, server) {

    Hoek.assert(!err, err);
    console.log('Server started at: ' + server.info.uri);
});





