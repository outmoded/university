// Load modules

var Hapi = require('hapi');
var Hoek = require('hoek');
var Version = require('./version');


// Declare internals

var internals = {};


internals.init = function (port, function (err) {

    var server = new Hapi.Server();
    module.exports = server;
    server.connection({ port: 3000 });
    server.register(Version, function (err) {

        Hoek.assert(!err, err);

        server.start(function (err) {

            Hoek.assert(!err, err);
            console.log('Server started at: ' + server.info.uri);
        });
    });
});

internals.init() ;

