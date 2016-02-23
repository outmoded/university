'use strict';

// Load modules

const Hoek = require('hoek');
const Server = require('./index');
const Config = require('./config');


// Declare internals

const internals = {};

internals.manifest = {
    connections: [
        {
            host: 'localhost',
            port: 8000,
            labels: ['web']
        },
        {
            host: 'localhost',
            port: 8001,
            labels: ['web-tls'],
            tls: Config.tls
        }
    ],
    registrations: [
        {
            plugin: './version',
            options: {
                select: ['web', 'web-tls']
            }
        },
        {
            plugin: './private',
            options: {
                select: ['web', 'web-tls']
            }
        },
        {
            plugin: './home',
            options: {
                select: ['web', 'web-tls']
            }
        },
        {
            plugin: './auth'
        },
        {
            plugin: 'hapi-auth-basic'
        },
        {
            plugin: 'vision'
        },
        {
            plugin: 'inert'
        }
    ]
};

internals.composeOptions = {
    relativeTo: __dirname
};

Server.init(internals.manifest, internals.composeOptions, (err, server) => {

    Hoek.assert(!err, err);

    // Server connections
    const web = server.select('web');
    const webTls = server.select('web-tls');


    // Logging started server
    console.log('Web server started at: ' + web.info.uri);
    console.log('WebTLS server started at: ' + webTls.info.uri);
});
