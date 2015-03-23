var Package = require('../package');

var internals = {
  response: {
    version: Package.version
  }
};

exports.register = function (server, options, next) {

  server.route({
    method: 'GET',
    path: '/version',
    handler: function(request, reply) {

      return reply(internals.response.version);
    }
  });

  return next();
};

exports.register.attributes = {
  name: 'version'
};
