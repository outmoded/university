var Hapi = require('hapi');
var Hoek = require('hoek');

var internals = {};


internals.package = require('../package.json');


internals.response = {
    version: internals.package.version
};


internals.server = new Hapi.Server();


internals.server.connection({ port: 8000 });

internals.server.route({
    path: '/version',
    method: 'GET',
    config: {
        description: 'Output server\'s version.',
        handler: function (request, reply) {

            return reply(internals.response);
        }
    }
});

internals.server.start(function (err) {

    Hoek.assert(!err, err);
    console.log('Server running at:', internals.server.info.uri);
});
