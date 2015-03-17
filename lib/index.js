var Hapi = require('hapi');
var Hoek = require('hoek');
var Package = require('../package.json');

var internals = {};

internals.server = new Hapi.Server();

internals.server.connection({ port: 8000 });

internals.response = {
    version: Package.version
};

internals.server.route({
    path: '/version',
    method: 'GET',
    config: {
        description: 'Get server version',
        handler: function (request, reply) {

            return reply(internals.response);
        }
    }
});

internals.server.start(function (err) {

    Hoek.assert(!err, err);
    console.log('info', 'Server started at: ' + internals.server.info.uri);
});
