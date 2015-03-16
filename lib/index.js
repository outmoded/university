var Hapi = require('hapi');
var Hoek = require('hoek');

var internals = {};
internals.json = require('../package.json');
internals.response = { version: internals.json.version };

var server = new Hapi.Server();
server.connection({ port: 8000 });

server.route({
    method: 'GET',
    path: '/version',
    handler: function (request, reply) {

        return reply(internals.response).type('application/json');
    }
});

server.start(function (err) {
    Hoek.assert(!err, err);
    console.log('Server running at:', server.info.uri);
});
