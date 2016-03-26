'use strict';

const Hapi = require('hapi');

const internals = {};

internals.package = require('../package.json');
internals.response = { version: internals.package.version };
internals.server = new Hapi.Server();

internals.server.connection({
    port: 8000
});

internals.server.route({
    method: 'GET',
    path: '/version',
    config: {
        description: 'Returns the current project version',
        handler: function (request, reply) {

            return reply(internals.response);
        }
    }
});

internals.server.start((err) => {

    if (err) {
        throw err;
    }

    console.log('Server running at: ', internals.server.info.uri);
});

module.exports = internals.server;
