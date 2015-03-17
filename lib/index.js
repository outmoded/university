'use strict';
var Hapi = require('hapi');
var Hoek = require('hoek');

var internals = {
    pack: require('../package.json')
};

var server = module.exports = new Hapi.Server();

server.connection({
    port: 8000
});

server.route([{
    method: 'GET',
    path: '/version',
    config: {
        description: 'version from package.json',
        handler: function(request, reply) {

            return reply({ version: internals.pack.version })
                .type('application/json');
        }
    }
}]);

server.start(function(err) {

    Hoek.assert(!err, err);
    return console.log('Server started at', server.info.uri);
});
