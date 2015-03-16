var Hapi = require('hapi');
var Package = require('../package.json');
var Hoek = require('hoek');

//Declare internals

var internals = {
    version: Package.version
};

var server = new Hapi.Server();
server.connection({ port: 8000 });

server.route({
    method: 'GET',
    path: '/version',
    config: {
        handler: function (request, reply) {

            return reply({ version: internals.version });
        },
        description: 'Get the version of the server'
    }
});

server.start(function (err) {

    Hoek.assert(!err, err);
    console.log('Server running at:', server.info.uri);
});
