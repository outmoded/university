'use strict';
var Hapi = require('hapi');

var server = module.exports = new Hapi.Server();
var pack = require('../package.json');

server.connection({ port: 8000 });

server.route([{
    method: 'GET',
    path: '/version',
    handler: function(request, reply) {

        reply({ versions: pack.version })
            .type('application/json');
    }
}]);
