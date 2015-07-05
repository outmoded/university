// Load modules

var Glue = require('glue');
var Joi = require('joi');
var Boom = require('boom');

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


        server.select('web-tls').ext('onPreResponse', function (request, reply) {

            if (request.response.isBoom) {

                // Bad Route Attempt

                if (request.response.output.statusCode === 404 &&
                        request.response.message === 'Not Found') {

                    return reply.redirect('https://localhost:8001/home').permanent();
                }

                // Catch hapi-auth-cookie insufficient scope responses.
                //
                // Unauthorized Access Attempt web-tls - redirect ./home
                // Options to access joi validation results
                // 1)
                // schema.validate(request.response.message, function (err, value) { console.log(err); console.log(value); });
                // 2)
                // result.error -> null
                // result.value -> { "a" : 123 }

                var schema = Joi.string().regex(/^Insufficient scope/);

                var result = Joi.validate(request.response.message, schema);

                if (result.error === null) {
                    return reply.redirect('https://localhost:8001/home').permanent();
                }
            }

            return reply.continue();
        });


        server.select('api').ext('onPreResponse', function (request, reply) {

            if (request.response.isBoom) {


                // Joi Validation Failed


                if (request.response.output.statusCode === 400) {

                    // 400 Malformed data entered.
                    return reply(Boom.badRequest('Malformed Data Entered'));
                }
            }

            return reply.continue();
        });


        // Start the server


        server.start(function (err) {

            return next(err, server);
        });
    });
};
