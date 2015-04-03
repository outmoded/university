// Load modules

var Server = require('./index');
var Hoek = require('hoek');


// Internals


var internals = {};


Server.init(8000, function (err, server) {

    Hoek.assert(!err, err);
    console.log('Server started at port' + server.info.uri);
});
