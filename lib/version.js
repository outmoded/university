'use strict';

const versionHandler = require('./route-methods/version').handler;

const internals = {};

exports.plugin = {
    name: 'version',
    description: 'example plugin university',
    register: function (server, options) {

        // Use below to test requests on dev server.
        // curl -H "Authorization: Bearer 1234574" -X GET https://localhost:8000/version

        server.route({
            method: 'GET',
            path: '/version',
            config: {
                description: 'Returns object with version of server and options.message.',
                handler: versionHandler
            }
        });
    }
};
