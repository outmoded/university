// Load modules

var Glue = require('glue');


exports.init = function (manifest, options, next) {

    Glue.compose(manifest, options, function (err, server) {

            if (err) {
                return next(err);
            }

            server.start(function (err) {

                return next(err, server);
            });
        });
};

































