// Load modules

var Hoek = require('hoek');
var Index = require('./lib');

// Start server

Index.init(function (err, server) {

    Hoek.assert(!err, err);
    console.log('Server started at: ' + server.info.uri);
});
