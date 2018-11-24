'use strict';


// Load modules

const Hapi = require('hapi');
const Version = require('./version');

const internals = {};

internals.init = async function (configs) {

    const serverOptions = {
        port: process.env.PORT || configs.server.port
    };

    const plugins = [
        {
            plugin: Version,
            options: {
                message: 'option passed to version plugin'
            }
        }
    ];

    const server = new Hapi.Server(serverOptions);

    await server.register(plugins, { once: true });

    await server.start();

    return server;
};

exports.init = internals.init;
