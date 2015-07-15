var Hapi = require('hapi');
var Package = require('../package.json');

var internals = {};

internals.response = { version: Package.version };

internals.init = function () {

    var server = new Hapi.Server();

    server.connection({
        port: 8000
    });

    server.route({
        method: 'GET',
        path: '/version',
        handler: function (request, reply) {

            return reply(internals.response);
        }
    })

    server.start();
}

internals.init();