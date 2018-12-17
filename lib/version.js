'use strict';

const versionHandler = require('./route-methods/version').handler;

const internals = {};

exports.plugin = {
    name: 'version',
    description: 'example plugin university',
    register: function (server, options) {

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
