var pkg = require('../package.json');
var Hapi = require('hapi');

var server = new Hapi.Server();

server.connection({
    host: 'localhost',
    port: 8000
});

server.route({
    method: 'GET',
    path: '/version',
    handler: function (request, reply) {


        reply({version: pkg.version});
    }
});

server.start(function (err) {


    if (err) {
        throw err;
    }

    console.log('Server started at ' + server.info.uri);
});
