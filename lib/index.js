// Load modules

var Glue = require('glue');

// Declare internals

var internals = {};

exports.init = function (manifest, composeOptions, next) {

    Glue.compose(manifest, composeOptions, function (err, server){

        if (err) {
            return next(err);
        }


        /* Method One
        server.ext('onRequest', function (request, reply) {

            if (request.connection.info.protocol === 'http') {
                return reply.redirect('https://localhost:8001' + request.url.path).code(301);
            }

            return reply.continue();
        });
        */

        // Two
        server.select('web').ext('onRequest', function (request, reply){

            return reply.redirect('https://localhost:8001' + request.url.path).code(301);
        });


        // Three @AdriVanHout method below:
        /*
        var redirect = function (request, reply) {

                return reply.redirect('https://localhost:8001' + request.url.path).permanent();
        };

        server.select('web').route({ method: '*', path: '/{path*}', handler: redirect });
        */

        server.start(function (err) {

            return next(err, server);
        });
    });
};
