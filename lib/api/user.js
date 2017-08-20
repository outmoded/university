'use strict';

const Users = require('../users.json');
const Hoek = require('hoek');
const Boom = require('boom');
const Joi = require('joi');


// Declare internals

const internals = {};

internals.getUser = (payload, callback) => {


    let account = null;

    account = Users[payload.username];

    // joi could validate this error.

    if (!payload.username ||
        !payload.password) {

        return callback('Invalid username or password', null);
    }

    account = Users[payload.username];

    if (!account ||
        account.password !== payload.password) {

        return callback('Invalid username or password', null);
    }

    // Remove sensitive data from user cookie info

    const accountCopy = Hoek.clone(account);
    delete accountCopy.password;

    // promise resolved

    return callback(null, accountCopy);
};

exports.register = (server, options, next) => {

    // Code inside the callback function of server.dependency will only be executed
    // after Auth plugin has been registered. It's triggered by server.start,
    // and runs before actual starting of the server.  It's done because the call to
    // server.route upon registration with auth:'basic' config would fail and make
    // the server crash if the basic strategy is not previously registered by Auth.

    server.dependency(['AuthCookie', 'Crumbit'], internals.after);

    return next();
};

exports.register.attributes = {
    name: 'ApiUser'
};

internals.handleJoiValidationFailure = function (request, reply) {

    // Route specific error handling
    // using route specific server extensions.
    // Joi validation error handling is applied only to the /login route.
    // Previous logic applied Joi validation errors handling to all routes.

    if (request.response.isBoom) {

        if (request.response.output.statusCode === 400) {

            // INSPECT onPreResponse JOI error response and parse for more detailed error handling.
            // console.log('INSPECT ' + '\n' +
            //     'Object.keys(request.response.output) ' + Object.keys(request.response.output) + '\n' +
            //     'request.response.output.statusCode ' + request.response.output.statusCode + '\n' +
            //     'Object.keys(request.response.output.payload) ' + Object.keys(request.response.output.payload) + '\n' +
            //     'request.response.output.payload.error ' + request.response.output.payload.error + '\n' +
            //     'request.response.output.payload.message ' + request.response.output.payload.message + '\n' +
            //     'request.response.output.payload.message ' + request.response.output.payload.validation , null, 2);

            return reply(Boom.badRequest('/login Malformed Data Entered'));
        }
    }

    return reply.continue();
};

internals.after = (server, next) => {

    server.route({
        method: 'POST',
        path: '/login',
        config: {
            ext: {
                onPreResponse: { method: internals.handleJoiValidationFailure }
            },
            auth: { strategy: 'session', mode: 'try' },
            plugins: { 'hapi-auth-cookie': { redirectTo: false } },
            validate: {
                payload: { // payload for POST, query for GET
                    username: Joi.string().min(3).max(6),
                    password: Joi.string().min(3).max(7) }
            },
            description: 'Authenticates user credentials.',
            handler: (request, reply) => {

                internals.getUser(request.payload, (err, user) => {

                    if (err) {
                        return reply(Boom.unauthorized(err)); // "oh, no!"
                    }

                    const userAccount = Hoek.clone(user);
                    const sid = String(userAccount.id);
                    delete userAccount.password;

                    request.server.app.cache.set(sid, { account: userAccount }, 0, (err) => {

                        if (err) {
                            return reply(Boom.unauthorized(err));
                        }

                        request.cookieAuth.set({ sid });
                        return reply(userAccount);
                    });
                });
            }
        }
    });

    server.route({
        method: 'POST',
        path: '/logout',
        config: {
            auth: { strategy: 'session', mode: 'try' },
            plugins: { 'hapi-auth-cookie': { redirectTo: true } },
            description: 'Destroys authenticated users session.',
            handler: (request, reply) => {

                request.cookieAuth.clear();
                return reply({ message: 'Logged out' });
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/generate',
        config: {
            auth: false,
            description: 'Get crumb to start session.',
            handler: (request, reply) => {

                // Read docs about automatically setting crumb to viewContext.
                // This allows crumbs to be placed into views.
                // generate route built for CORS receive a authentic crumb.

                return reply({ crumb: request.plugins.crumb });
            }
        }
    });

    return next();
};
