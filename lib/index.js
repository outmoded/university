// Load modules

var Hapi = require('hapi');
var Hoek = require('hoek');

// Declare internals
var internals = {
    version: require('./version')
};


internals.init = function () {

    var server = new Hapi.Server();

    server.connection({ port: 8000 });

    server.register(internals.version, function (err) {
		
        Hoek.assert(!err, err);
    });

    server.start(function (err) {

        Hoek.assert(!err, err);
        console.log('Server started at: ' + server.info.uri);
    });
};


internals.init();
