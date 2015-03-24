var Package = require('../package.json');

exports.register = function (server, option, next) {
    
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

    next();
};

exports.register.attributes =  {
    name: 'versionPlugin',
    version: '1.0.0'
};