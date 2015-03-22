// Load modules

var Hapi = require('hapi');
var Hoek = require('hoek');
var Version = require('./version');


// Declare internals

var internals = {};


internals.init = function () {

    var server = new Hapi.Server();
    server.connection({ port: 8000 });

    server.register(Version, function (registerErr) {

        Hoek.assert(!registerErr, registerErr);
        server.start(function (startErr) {

            Hoek.assert(!startErr, startErr);
            console.log('Server started at: ' + server.info.uri);
        });        
    });
};

internals.init();
