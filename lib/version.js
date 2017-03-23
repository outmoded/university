/**
 * Created by hediayed on 07/04/16.
 */
'use strict';

const Package = require('../package.json');


// Declare internals

const internals = {
    pluginName: "Version",
    response: {
        version: Package.version
    }
};

exports.register = (server, option, next) => {

    server.route({
        method: 'GET',
        path: '/version',
        config: {
            description: 'Returns the version of the server',
            handler:  (request, reply) => {

                return reply(internals.response);
            }
        }
    });

    next();
};

exports.register.attributes = {
    name: internals.pluginName
};
