// Declare internals
var internals = {
  response: {
    version: require('../package.json').version
  }
};

// Register plugin
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

// Plugin metadata
exports.register.attributes = {
    name: 'version'
};
