// Start.js - Why is this required over just index.js? 
//
var Hoek = require('hoek');

// Requiring './lib' like this assigns all the `register` & `init` methods to the variable `lib`. 

var lib = require('./lib');

// port and the callback are called 

lib.init(3000, function (err, server) {

    Hoek.assert(!err, err);
    console.log('Server started at: ' + server.info.uri);
});


