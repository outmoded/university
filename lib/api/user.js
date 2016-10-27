'use strict';

const Users = require('../users.json');
const Hoek = require('hoek');
const Boom = require('boom');
const Joi = require('joi');


// Declare internals

const internals = {};

internals.getUser = (payload, callback) => {


    let account = null;

    // console.log(username);
    // console.log(password);

    account = Users[payload.username];

    // joi should prevent this error.
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
    server.dependency('AuthCookie', internals.after);

    return next();
};

exports.register.attributes = {
    name: 'ApiUser'
};


internals.after = (server, next) => {

    server.route({
        method: 'POST',
        path: '/login',
        config: {
            auth: { strategy: 'session', mode: 'try' },
            plugins: { 'hapi-auth-cookie': { redirectTo: false } },
            validate: {
                payload: { // payload for POST, query for GET
                    username: Joi.string().min(3).max(6),
                    password: Joi.string().min(3).max(7)
                }
            },
            description: 'Authenticates user credentials.',
            handler: (request, reply) => {

                internals.getUser(request.payload, (err, user) => {

                    if (err) {
                        // console.log('user invalid: ' + err);
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
                // return reply.redirect('/home');
            }
        }
    });

    return next();
};
