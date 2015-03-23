// Load modules

var Hapi = require('hapi');
var Hoek = require('hoek');


var Version = require('./version');
var internals = {};
internals.init = function () {

    var server = new Hapi.Server();
    server.connection({ port: 8000 });

    server.register(Version, function (err) {

	server.start(function (err) {

            Hoek.assert(!err, err);
            console.log('Server started at: ' + server.info.uri);
	});

	Hoek.assert(!err, err);
    });

};

internals.init();
