var Hoek = require('hoek');
var Users = require('../users.json');
var Boom = require('boom');
var Joi = require('joi');


var internals = {};


/* Promise method but node.js v0.10.0 d/n like this.
internals.getValidateUserPromise = function (username, password){

    return new Promise(function (resolve, reject){

        var account = null;

        // console.log(username);
        // console.log(password);

        account = Users[username];

        if (!account || account.password !== password) {
            throw { errorNum: 2, message: 'Invalid password or username' };
        }

        // Remove sensitive data from user cookie info

        var accountCopy = Hoek.clone(account);
        delete accountCopy.password;

        // promise resolved

        resolve(accountCopy);
    });
};
*/


internals.getValidateUser = function (username, password){

    var account = null;

    account = Users[username];

    if (!account || account.password !== password) {
        return { errorNum: 2, message: 'Invalid password or username' };
    }

    var accountCopy = Hoek.clone(account);
    delete accountCopy.password;

    // promise resolved

    return accountCopy;
};


exports.register = function (server, options, next) {

    // Code inside the callback function of server.dependency will only be executed
    // after AuthCookie plugin has been registered. It's triggered by server.start,
    // and runs before actual starting of the server.  It's done because the call to
    // server.route upon registration with auth:'cookie' config would fail and make
    // the server crash if the basic strategy is not previously registered by Auth.
    server.dependency('AuthCookie', function (server, next){

        server.route({
            method: 'POST',
            path: '/login',
            config: {
                description: 'Returns the login page',
                auth: {
                 mode: 'try',
                 strategy: 'university'
                },
                plugins: {
                    'hapi-auth-cookie': {
                        redirectTo: false
                    }
                },
                validate: {
                    payload: { // payload for POST, query for GET
                        username: Joi.string().min(3).max(6),
                        password: Joi.string().min(3).max(7)
                    }
                },
                handler: function (request, reply) {

                    //  Originally promise logic was here but node.js v0.10.0
                    //  throws errors so removed it from project.
                    //  This is a quick fix to solve travis issues.

                    var user = internals.getValidateUser(request.payload.username, request.payload.password);

                    if (user.message === 'Invalid password or username'){

                        return reply(Boom.unauthorized(user.message)); // "oh, no!"
                    }

                    request.auth.session.set(user); // Success { id: 1, email: 'foo@hapiu.com' }

                    return reply(user);
                }
            }
        });


        server.route({
            method: 'POST',
            path: '/logout',
            config: {
                auth: {
                    strategy: 'university',
                    scope: ['user', 'admin']
                },
                handler: function (request, reply) {

                    // setTimeout( function () {

                    request.auth.session.clear();

                    return reply({ message: 'Logged out' });

                    // }, 4000);
                }
            }
        });


        return next();
    });
    return next();
};

exports.register.attributes = {
        name: 'Login'
};
