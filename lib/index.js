// Load modules

var Glue = require('glue');
var Joi = require('joi');

// Declare internals

var internals = {};


exports.init = function (manifest, composeOptions, next) {

    Glue.compose(manifest, composeOptions, function (err, server){

        if (err) {
            return next(err);
        }

        // TLS everything

        server.select('web').ext('onRequest', function (request, reply) {

            reply.redirect('https://localhost:8001' + request.url.path).permanent();
            //request.setUrl('https://localhost:8001' + request.url.path).permanent();
            //return reply.continue();
        });


        server.select('web-tls').ext('onPreResponse', function (request, reply) {

            // This gets the boom error message.
            
            if (request.response.isBoom) {

                // Bad Route Attempt Check

                if (request.response.output.statusCode === 404 &&
                        request.response.message === 'Not Found') {

                    return reply.redirect('https://localhost:8001/home').permanent();
                }


                // Unauthorized Access Attempt Check
                // 
                // Options to access joi validation results
                // 1)
                // var string = 'Insufficient scope and more ';
                // schema.validate(request.response.message, function (err, value) { console.log(err); console.log(value); });
                // 2)
                // result.error -> null
                // result.value -> { "a" : 123 }

                schema.validate(request.response.message, function (err, value) { console.log(err); console.log(value); });

                var schema = Joi.string().regex(/^Insufficient scope/);

                var result = Joi.validate(request.response.message, schema);  

                if (result.error === null) {
                    console.log('Unauthorized access attempt');
                    return reply.redirect('https://localhost:8001/home').permanent();
                }
            }

            return reply.continue()
        });



        // Start the server

        server.start(function (err) {

            return next(err, server);
        });
    });
};
