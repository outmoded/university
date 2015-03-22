var Package = require('../package.json');

var internals = {};
internals.versionInfo = { version: Package.version };

module.exports.register = function (server, options, next) {

    server.route({
        method: 'GET',
        path: '/version',
        config: {
            description: 'Returns the version of the server',
            handler: function (request, reply) {

                return reply(internals.versionInfo);
            }
        }
    });

    next();
};


module.exports.register.attributes = {
    name: 'versionPlugin',
    version: '1.0.0'
};
