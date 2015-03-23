var Package = require('../package.json');
var internals = {};

exports.register = function(server, options, next){
    server.route({
        method: 'GET',
        path: '/version',
        config: {
            description: 'Returns the version of the server',
            handler: function (request, reply) {

                return reply({ version: Package.version });
            }
        }
    });
};

exports.register.attributes = {
    pkg: Package
};