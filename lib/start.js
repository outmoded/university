// Load modules

var Hoek = require('hoek');
var Server = require('./lib/index');


// Declare internals

var internals = {};

Composer(function (err, server) {

    if (err) {
        throw err;
    }

    server.start(function () {

        console.log('Started the plot device on port ' + server.info.port);
    });
});



