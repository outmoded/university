'use strict';

// Load modules

const Package = require('../package.json');


// Declare internals

const internals = {
    response: {
        version: Package.version
    }
};


exports.register = (server, options, next) => {

    server.route({
        method: 'GET',
        path: '/version',
        config: {
            description: 'Returns the version of the server',
            handler: (request, reply) => {

                return reply(internals.response);
            }
        }
    });

    return next();
};

exports.register.attributes = {
    name: 'version'
};
