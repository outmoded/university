// Load modules

var Hapi = require('hapi');
var Hoek = require('hoek');

// Declare internals

var internals = {};


internals.init = function () {

    var server = new Hapi.Server();
    server.connection({ port: 8000 });

    server.register({ register: require('./version.js') }, function (err) {

        Hoek.assert(!err, err);

        server.start(function (err) {

            Hoek.assert(!err, err);
            console.log('Server started at: ' + server.info.uri);
        });
    });

};

internals.init();
