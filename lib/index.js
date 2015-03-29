// Load modules

var Hapi = require('hapi');
var Hoek = require('hoek');
var Version = require('./version');

// Exports

exports.init = function (port, callback) {

    if (typeof callback === 'undefined' && typeof port === 'function'){
        callback = port;
        port = 8000;
    }

    var server = new Hapi.Server();
    server.connection({ port: port });
    server.register(Version, function (err) {

	server.start(function (err) {

            return callback(err, server);
	});
    });
};
