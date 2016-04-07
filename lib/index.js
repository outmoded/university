'use strict';

// Load modules

const Hapi = require('hapi');
const Version = require('./version');


// Declare internals

exports.init = (port, done) => {

    const server = new Hapi.Server();
    server.connection({ port: port });
    server.register(Version, (err) => {

        if (err){
            return done(err);
        }

        server.start((err) => {
            return done(err, server);
        });
    });
};
