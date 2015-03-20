exports.register = function (server, options, next) {
    server.route({
        method: 'GET',
        path: '/version',
        config: {
            description: 'Returns the version of the server',
            handler: function (request, reply) {
                return reply({ version: options.version });
            }
        }
    });
};

exports.register.attributes = {
    pkg: { name : 'version plugin' }
};