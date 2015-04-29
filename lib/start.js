// Load modules

var Hoek = require('hoek');
var Server = require('./index');


// Declare internals

var internals = {};


Server.init(8000, function (err, server) {

    Hoek.assert(!err, err);
    console.log('Server started at: ' + server.info.uri);
});
