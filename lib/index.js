// Load modules

var Config = require('./config'),
    Glue = require('glue');

// Declare internals

var internals = {};


exports.init = function (manifest, composeOptions, next) {

    Glue.compose(manifest, composeOptions, function (err, server){

        if (err) {
            return next(err);
        }

        server.select('web').ext('onRequest', function (request, reply) {

            // force redirect to https
            return reply.redirect('https://' + Config.host + ':' + Config.tls.port + request.url.path).permanent();
        });

        server.start(function (err) {

            return next(err, server);
        });
    });
};
