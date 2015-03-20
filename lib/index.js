// Load modules

var Hapi = require('hapi');
var Hoek = require('hoek');
var Package = require('../package.json');


// Declare internals

var internals = {};


internals.init = function () {

    var server = new Hapi.Server();
    server.connection({ port: 8000 });

    server.register([
        {
            register: require('./version'),
            options: Package
        }
    ], function (err) {
        if (err) {
            console.error(['Failed to load a plugin: ', err].join());
        }
    });

    server.start(function (err) {

        Hoek.assert(!err, err);
        console.log('Server started at: ' + server.info.uri);
    });
};

internals.init();
