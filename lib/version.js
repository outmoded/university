'use strict';

// Credits:
// This script originally written by:
// MylesBorins https://github.com/MylesBorins
// See this PR: https://github.com/hapijs/university/pull/44

const internals = {};

exports.plugin = {
    name: 'version',
    description: 'example plugin university',
    register: function (server, options) {

        const version = function (request, h) {

            // Notice how request.server.app properties are exposed in
            // the routes request object. Use this feature to expose things
            // like DB connections throughout the application

            const response = {
                version: request.server.app.version,
                message: request.server.app.message
            };

            return response;
        };

        server.route({
            method: 'GET',
            path: '/version',
            config: {
                description: 'Returns object with version of server and options.message.',
                handler: version
            }
        });
    }
};
