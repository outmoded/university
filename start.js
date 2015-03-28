// Load modules

var Hoek = require('hoek');
var lib = require('./lib');

lib.init(function (err, server) {

    Hoek.assert(!err, err);
    console.log('Server started at: ' + server.info.uri);
});
