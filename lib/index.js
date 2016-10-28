'use strict';

// Load modules

const Hapi = require('hapi');
const Version = require('./version');


// Declare internals

const internals = {};


exports.init = function (port, next) {

    const server = new Hapi.Server();
    server.connection({ port });
    server.register(Version, (err) => {

        if (err) {
            return next(err);
        }

        server.start((err) => {

            return next(err, server);
        });
    });
};
