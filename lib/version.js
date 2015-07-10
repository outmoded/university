// Load modules

var Pkg = require('../package.json');


// Declare internals

var internals = {
    response: {
        version: Pkg.version
    }
};

exports.register = function (server, options, next) {

    server.route({
        method: 'GET',
        path: '/version',
        config: {
            description: 'Returns the version of the server',
            handler: function (request, reply) {

                return reply(internals.response);
            }
        }
    });

    return next();
};

exports.register.attributes = {
    name: 'version'
};

