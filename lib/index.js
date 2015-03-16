var Hapi = require('hapi');
var Hoek = require('hoek');

var server = new Hapi.Server();
var internals = {
  response: {
    version: require('../package.json').version
  }
};

server.connection({ port: 8000 });

server.route({
  method: 'GET',
  path: '/version',
  handler: function (request, reply) {
    
    return reply(internals.response);
  },
  config: {
    description: 'Get version of server'
  }
});

server.start(function (err) {
  
  Hoek.assert(!err, err);
  console.log('Server running at:', server.info.uri);
});
