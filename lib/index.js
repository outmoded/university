var Hapi = require('hapi');
// Removing Hoek because we are sending the error back to start.js with the error in the callbck
//var Hoek = require('hoek');
var Version = require('./version');

exports.init = function (port, callback) {

    if (typeof port === 'function') {
        cb = port;
    }
    else if (port === null) {
        port = 8000;
    }

    var server = new Hapi.Server();

    server.connection({ port: port });

    server.register(Version, function (err) {

        if (err) {
            return callback(err, server);
        }

        server.start(function (err) {

            if (err) {
                return callback(err, server);
            }
        });
    });
};
