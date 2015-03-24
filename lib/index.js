// Load modules

var Hapi = require('hapi');
var Hoek = require('hoek');
var Version = require('./version.js');


// Declare internals

var internals = {
    connection: {
        port: 8000
    }
};


internals.init = function () {

    var server = new Hapi.Server();
    server.connection(internals.connection);

    server.register(Version, function (err) {

        Hoek.assert(!err, err);
        server.start(function (err) {
    
            Hoek.assert(!err, err);
            console.log('Server started at: ' + server.info.uri);
        });
    });
};
s
internals.init();
