// Load modules

var Hoek = require('hoek');
var Hueniversity = require('./index');


// Declare internals

var internals = {};


Hueniversity.init(8000, function (err, server) {

    Hoek.assert(!err, err);
    console.log('Server started at: ' + server.info.uri);
});

