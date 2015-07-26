exports.register = function (server, options, next) {

    server.route({
        method: 'GET',
        path: '/description',
        config: {
            description: 'Returns the description of the server',
            handler: function (request, reply) {

                return reply(options.description);
            }
        }
    });
    next();
};

exports.register.attributes = {
  name: 'description',
  version: '0.1'
};
