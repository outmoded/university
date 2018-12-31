'use strict';

const versionHandler = require('./route-methods/version').handler;
const authenticateHandler = require('./route-methods/authenticate').handler;
const authenticateUser = require('./route-methods/authenticate').authenticateUser;
const privateHandler = require('./route-methods/private').handler;

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

        server.route({
            method: 'POST',
            path: '/authenticate',
            config: {
                description: 'Authenticates user credentials & returns token.',
                auth: false,
                handler: authenticateHandler,
                pre: [{ method: authenticateUser, assign: 'welcome' }]
            }
        });

        server.route({
            method: 'POST',
            path: '/private',
            config: {
                description: 'restricted to admin users',
                auth: { strategy: 'default', scope: ['admin'] },
                handler: privateHandler
            }
        });
    }
};
