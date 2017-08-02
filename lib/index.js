'use strict';

// Load modules

const Glue = require('glue');
// const Boom = require('boom');
const Joi = require('joi');

// Declare internals

const internals = {};

exports.init = (manifest, options, next) => {

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

        webTls.ext('onPreResponse', (request, reply) => {

            if (request.response.isBoom) {

                // Handle Bad Route Attempt

                if (request.response.output.statusCode === 404 &&
                    request.response.message === 'Not Found') {

                    return reply.redirect(webTls.info.uri + '/home').permanent();
                }
            }

            return reply.continue();
        });

        webTls.ext('onPreResponse', (request, reply) => {

            if (request.response.isBoom) {

                // Assignment9 Moved below Joi validation error handling
                // into a route-level extension point.
                //
                // Joi Validation Failed
                // if (request.response.output.statusCode === 400) {
                //     // statusCode 400 Bad Request
                //     // "The server cannot or will handle request due to something that is perceived to be a client error
                //     // (e.g., malformed request syntax, invalid request message framing, or deceptive request routing)."
                //     return reply(Boom.badRequest('Malformed Data Entered'));
                // }

                // Catch hapi-auth-cookie insufficient scope responses.

                const schema = Joi.string().regex(/^Insufficient scope/);
                const result = Joi.validate(request.response.message, schema);

                if (result.error === null) {
                    return reply.redirect(webTls.info.uri + '/home');
                }
            }

            return reply.continue();
        });

        // Start the server

        server.start((err) => {

            return next(err, server);
        });
    });
};
