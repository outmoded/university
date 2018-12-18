'use strict';


// Load modules

const Hapi = require('hapi');
const Version = require('./version');
const Package = require('../package.json');
const HapiAuthBearerToken = require('hapi-auth-bearer-token');
const AuthToken = require('./authtoken');

const internals = {};

internals.init = async function (configs) {

    const serverOptions = {
        port: process.env.PORT || configs.server.port,
        tls: configs.server.tls
    };


    const plugins = [
        {
            plugin: HapiAuthBearerToken,
            options: {}
        },
        {
            plugin: AuthToken,
            options: {}
        },
        {
            plugin: Version,
            options: {}
        }
    ];

    const server = new Hapi.Server(serverOptions);

    // Set server.app properties (see docs: https://hapijs.com/api#server.app)

    server.app.version = Package.version;
    server.app.message = 'options.message now passed using server.app.message';

    await server.register(plugins, { once: true });

    await server.start();

    return server;
};

exports.init = internals.init;
