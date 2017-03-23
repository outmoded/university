'use strict';

const Package = require('../package.json');

const internals = {
    response: {
        version: Package.version
    }
};

exports.register = function (server, options, next) {
    
    server.route({
        method: 'GET',
        path: '/version',
        config: {
            description: 'Returns the version of the server',
            handler: function (request, reply) {

                return reply(internals.response);
            }
        }
    });

    next();
};

exports.register.attributes = {
    name: 'Version'
};
