// Load modules

var Hoek = require('hoek');
var Lib = require('./');

// Start server

Lib.init(8000, function (err, server) {

    Hoek.assert(!err, err);
    console.log('Server started at: ' + server.info.uri);
});
