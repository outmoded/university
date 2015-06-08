// Load modules

var Glue = require('glue');

// Declare internals

var internals = {};


exports.init = function (manifest, composeOptions, next) {

    Glue.compose(manifest, composeOptions, function (err, server){

        if (err) {
            return next(err);
        }

        // TLS everything

        server.select('web').ext('onRequest', function (request, reply) {

            return reply.redirect('https://localhost:8001' + request.url.path).permanent();
        });

        // Start the server

        server.start(function (err) {

            return next(err, server);
        });
    });
};
