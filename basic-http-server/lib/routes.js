var version = require('../package.json').version;

var routes = {};

routes.version = {
  method: 'GET',
  path: '/version',
  handler: function (request, reply) {
    return reply({ version: version });
  }
};

module.exports = routes;
