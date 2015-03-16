var Hapi = require('hapi');
var Hoek = require('hoek');
var Package = require('../package.json');

var internals = {};

internals.server = new Hapi.Server();
internals.server.connection({ port: 8000 });

internals.versionResponse = {
  version: Package.version
};

internals.server.route({
    method: 'GET',
    path: '/version',
    config: {
      description: 'Returns the current module version'
    },
    handler: function (request, reply) {

        return reply(internals.versionResponse);
    }
});

internals.server.start(function (err) {

    Hoek.assert(!err, err);

    console.log('Server listening on port:', internals.server.info.port);
});
