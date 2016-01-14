'use strict';

// Load Modules

const Hapi = require('hapi');
const Hoek = require('hoek');
const Package = require('../package.json');


// Declare Internals

const internals = {
    response: {
        version: Package.version
    }
};

internals.init = function () {

    const server = new Hapi.Server();
    server.connection({ port: 8000 });

    server.route({
        method: 'GET',
        path: '/version',
        config: {
            description: 'Returns the version of the server',
            handler: function (request, reply) {

              return reply(internals.response);
            }
        }
    });

    server.start(function (err) {

        Hoek.assert(!err, err);
        console.log('Server started at: ' + server.info.uri);
    });
};

internals.init();
