var Hapi = require('hapi');
var Version = require('./version');

exports.init = function (port, callback) {

    if (typeof port === 'function') {
        callback = port;
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
