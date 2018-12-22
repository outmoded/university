'use strict';


// Load modules

const Hapi = require('hapi');
const Version = require('./version');

const internals = {};


internals.init = async function () {

    const serverOptions = {
        port: process.env.PORT || 8000
    };

    const plugins = [
        {
            plugin: Version,
            options: {
                message: 'assignment2'
            }
        }
    ];

    const server = new Hapi.Server(serverOptions);

    await server.register(plugins, { once: true });

    await server.start();

    return server;
};

internals.init()
    .then((server) => {

        console.log('Server startd at: ' + server.info.uri);
        console.log('Server started port:' + server.info.port);
    })
    .catch((err) => {

        console.log('server start up failed:!!! ' + err);
    });
