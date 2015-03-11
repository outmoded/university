// Load Modules
var Hapi = require('hapi');

//Declare internals
var internals = {
    package: require('./package.json')
};

var server = new Hapi.Server();
server.connection({ port:8000 });

server.route({
    method: 'GET',
    path: '/version',
    config: {
        handler: function (request, reply) {

            reply({
                version: internals.package.version
            });
        }
    }
});

server.start(function () {

    console.log('Server started listening at:' + server.info.uri);
});
