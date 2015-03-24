// Load modules

var Pkg = require('../package.json');

exports.register = function(server, options, next) {

    server.route({
        method: 'GET',
        path: '/version',
        config: {
            description: 'Returns the version of the server',
            handler: function(request, reply) {

                return reply({ version: Pkg.version });
            }
        }
    });

    return next();
};

exports.register.attributes = {
    name: 'version'
};
