var Hapi = require('hapi');
var Hoek = require('hoek');
var internals = {
    version: require('./package.json').version
};

var server = new Hapi.Server();

server.connection({ port: 8000 });

server.route({
    method: 'GET',
    path: '/version',
    config: {
        handler: function (request, reply) {

            return reply({ version: internals.version });
        }
    }
});

server.start(function (err) {

        Hoek.assert(!err, err);
        console.log('Server running at:', server.info.uri);
});
