'use strict';

// Import lib

const Hapi = require('hapi');
const Package = require('../package.json');

// Make declaration

const internals = {
    version: { version: Package.version },
};

internals.start = async () => {

    const server = new Hapi.Server({ port: Number(process.env.PORT||'8000') });

    server.route({ path: '/version', method: 'Get',
        handler: function (request, h) {

            return h.response(internals.version);
        },
    }
    );

    await server.start();
    return server;
    //   console.log('Hapi server starts: ', server.info.port);
};


internals.start().then(function (server) {

    console.log('Hapi server starts: ', server.info.port);
});
