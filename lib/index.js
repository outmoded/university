var Hapi = require('hapi');
var Hoek = require('hoek');
var Package = require('../package.json');

var internals = {
    package: Package
};

var server = new Hapi.Server();
server.connection({ port: 8000 });

server.route({
    method: 'GET',
    path: '/version',
    config: {
        description: 'Reply with version of this package',
        handler: function (request, reply) {

            return reply({ version: internals.package.version });
        }
    }
});

server.start(function (err) {

    Hoek.assert(!err, err);
    console.log('Server running at:', server.info.uri);
});
