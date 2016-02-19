'use strict';

// Load modules

const Basic = require('hapi-auth-basic');
const Users = require('./users.json');


// Declare internals

const internals = {};


internals.validateFunc = function (request, username, password, callback) {

    const user = Users[username];
    if (!user || user.password !== password) {
        return callback(null, false);
    }

    user.username = username;

    return callback(null, true, user);
};


exports.register = function (server, options, next) {

    server.register(Basic, (err) => {

        if (err) {
            return next(err);
        }

        server.auth.strategy('basic', 'basic', { validateFunc: internals.validateFunc });
        server.route({
            method: 'GET',
            path: '/private',
            config: {
                auth: 'basic',
                description: 'Returns a greeting message to the authenticated user',
                handler: function (request, reply) {

                    const html = '<div>Hello ' + request.auth.credentials.username + '</div>';
                    return reply(html);
                }
            }
        });

        return next();
    });
};


exports.register.attributes = {
    name: 'Private'
};
