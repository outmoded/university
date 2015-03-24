// Load modules

var Hapi = require('hapi');
var Hoek = require('hoek');
var version = require('./version');


// Declare internals

var internals = {};


internals.init = function () {

    var server = new Hapi.Server();
    server.connection({ port: 8000 });

    server.register({register: version}, function (err) {

        if (err) {
            console.error('Failed to load plugin:', err);
        }
    });

    server.start(function (err) {

        Hoek.assert(!err, err);
        console.log('Server started at: ' + server.info.uri);
    });
};

internals.init();
