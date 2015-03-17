var Hapi = require('hapi');
var Hoek = require('hoek');

var package = require('../package.json');

var internals = {
    staticVersion: {
        version: package.version
    }
};

var server = new Hapi.Server();
server.connection({ port:8000 });

server.route({
    method: 'GET',
    path: '/version',
    config: {
        handler: function (request, reply) {

            return reply(internals.staticVersion);
        }
    }
});

server.start(function (err) {

    Hoek.assert(!err, err);
    console.log('Server started listening at: ' + server.info.uri);
});
