'use strict';

var Package = require('../package.json');

//Plugin
exports.register = function (server, options, next) {
    server.route({
        method: 'GET',
        path: '/version',
        config: {
            description: 'Returns the version of the server',
            handler: function (request, reply) {
                return reply({ version: Package.version });
            }
        }
    });
    next();
};

//Attributes
exports.register.attributes = {
    pkg: Package
};