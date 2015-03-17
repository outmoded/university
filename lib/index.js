'use strict';

var Hapi = require('hapi');
var Hoek = require('hoek');
var Package = require('../package.json');

var internals = {};

internals.server = new Hapi.Server();
internals.server.connection({port:8000});
internals.version = {version:Package.version};

internals.server.route({
    method: 'GET',
    path: '/version',
    config: {
        description: 'Get current package version',
	handler: function (request, reply){

            return reply(internals.version);	    
	}
    }
});

internals.server.start(function (err) {

    Hoek.assert(!err, err);
    console.info('Server started at', internals.server.info.uri);
});

module.exports = internals.server;
