// Load modules

var Hapi = require('hapi');
var Hoek = require('hoek');
var Version = require('./version');

exports.init = function (callback) {

    var server = new Hapi.Server();
    server.connection({ port: 8000 });
    server.register(Version, function (err) {

        Hoek.assert(!err, err);
        server.start(function (err) {
            
	    return callback(err, server);
        });
    });
};
