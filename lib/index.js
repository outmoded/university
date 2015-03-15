var Hapi = require('hapi');
var Hoek = require('hoek');
var Package = require('../package.json');

var internals = {
    version: Package.version
};

var server = new Hapi.Server();

server.connection({ port: 8000 });

server.route({
    method: 'GET',
    path: '/version',
    config: {
        description: 'Returns the server version',
        handler: function (request, reply) {

            return reply({ version: internals.version });
        }
    }
});

server.start(function (err) {

    Hoek.assert(!err, err);

    console.log('Server is running at ', server.info.uri);
});
