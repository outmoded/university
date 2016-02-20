'use strict';

// Load modules

const Hoek = require('hoek');
const Server = require('./index');


// Declare internals

const internals = {};


// glue manifest

internals.manifest = {
    connections: [
        {
            port: 8000
        }
    ],
    registrations: [
        {
            plugin: {
                register: './version',
                options: {}
            }
        },
        {
            plugin: {
                register: './private',
                options: {}
            }
        },
        {
            plugin: {
                register: 'hapi-auth-basic',
                options: {}
            }
        },
        {
            plugin: {
                register: './university-auth',
                options: {}
            }
        },
        {
            plugin: {
                register: './home',
                options: {}
            }
        },
        {
            plugin: {
                register: 'vision',
                options: {}
            }
        },
        {
            plugin: {
                register: 'inert',
                options: {}
            }
        }
    ]
};

internals.composeOptions = {
    relativeTo: __dirname
};

Server.init(internals.manifest, internals.composeOptions, (err, server) => {

    Hoek.assert(!err, err);
    console.log('Server started at: ' + server.info.uri);
});
