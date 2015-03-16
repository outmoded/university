var Hapi = require('hapi');
var Hoek = require('hoek');
var internals = {
    version: require('../package.json').version
};

var server = new Hapi.Server();

server.connection({
    port: 8000
});

server.route({
    path: '/version',
    method: 'GET',
    config: {
        handler: function (request, reply) {

            return reply(internals.version);
        }
    }
});

server.start(function (err) {

    Hoek.assert(!err, err);
    console.log('Server running at:', server.info.uri);
});
