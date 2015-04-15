var Hapi = require('hapi');
var Version = require('./version');


exports.init = function (port, next) {

    var boom = null;
    if (typeof(port) == 'function') {
        // Was port number forgotten?
        next = port;
        port = 0; 
        boom = new Error('Error no port submitted');
    } 
    else if (typeof(port) != 'number') {
        // Ensure port is a number?
        port = 0; 
        boom = new Error('Error port is not valid number');
    }

    var server = new Hapi.Server();
    server.connection({ port: port });
    server.register(Version, function (err) {

        if (err){
            return next(err, server);
        }
        else if (boom){
            return next(boom, server);
        }

        server.start(function (err) {

            return next(err, server);
        });
    });
};

