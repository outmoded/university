'use strict';

// Load modules

const Glue = require('glue');

// Declare internals

const internals = {};


exports.init = function (manifest, options, next) {

    Glue.compose(manifest, options, (err, server) => {

        if (err) {
            return next(err);
        }

        const web = server.select('web');
        const webTls = server.select('web-tls');

        // TLS everything

        web.ext('onRequest', (request, reply) => {

            return reply.redirect(webTls.info.uri + request.url.path).permanent();
        });

        // Start the server

        server.start((err) => {

            return next(err, server);
        });
    });
};
