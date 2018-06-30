'use strict';


// Load modules

const Hapi = require('hapi');
const Package = require('../package.json');


// Declare internals

const internals = {
    response: {
        version: Package.version
    }
};


internals.init = async function () {

    const serverOptions = {
        port: process.env.PORT || 8000
    };

    const server = new Hapi.Server(serverOptions);

    const version = function (request, h) {

        return internals.response
    };

    server.route({
        method: 'GET',
        path: '/version',
        config: {
            description: 'Returns version of the server.',
            handler: version
        }
    });

    await server.start();

    return server;
};

internals.init().then((server) => {

    console.log('Server startd at: ' + server.info.uri);
    console.log('Server started port:' + server.info.port);
}).catch((err) => {

    console.log('server start up failed:!!! ' + err);
});
