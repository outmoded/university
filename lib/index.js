// Load modules

var Glue = require('glue');

// Declare internals

var internals = {};

exports.init = function (manifest, composeOptions, next) {

    Glue.compose(manifest, composeOptions, function (err, server){

        if (err) {
            return next(err);
        }

        server.ext('onRequest', function (request, reply) {

            if (request.connection.info.protocol === 'http') {
                return reply.redirect('https://localhost:8001' + request.url.path).code(301);
            }

            return reply.continue();
        });

        server.start(function (err) {

            return next(err, server);
        });
    });
};
