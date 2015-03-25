// Load modules

var Hapi = require('hapi');
var Hoek = require('hoek');
var Version = require('./version');


// Declare internals

var internals = {};


// Initialization

exports.init = internals.init = function (port, cb) {

    var server = new Hapi.Server();
    server.connection({ port: port || 8000 });
    server.register(Version, function (err) {

        Hoek.assert(!err, err);
        server.start(function (err) {

            Hoek.assert(!err, err);
            console.log('Server started at: ' + server.info.uri);

            if (cb) {
                return cb(err, server);
            }
        });
    });
};

if (process.env.NODE_ENV !== 'test') {
    internals.init();
}
