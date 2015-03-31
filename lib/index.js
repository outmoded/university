// Load modules

var Hapi = require('hapi');
var Version = require('./version');

exports.init = function (port, callback) {

    if (typeof port === 'function' ) {
        callback = port;
        port = null;
    }

    var server = new Hapi.Server();
    server.connection({ port: port || 8000 });
    server.register(Version, function (err) {

        if (err) {
            return callback(err, server);
        }

        server.start(function (err) {

            callback(err, server);
        });
    });
};
