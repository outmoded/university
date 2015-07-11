var Hoek = require('hoek');
var Users = require('../users.json');
var Boom = require('boom');
var Joi = require('joi');
var Promise = require('bluebird');


var internals = {};


// Promise using bluebird node.js v0.10.0 should like this.
internals.getValidatedUser = function (username, password){

    return new Promise( function (resolve, reject) {

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

// No promise way to validate users.
// internals.getValidatedUser = function (username, password){
//
//     var account = null;
//
//     account = Users[username];
//
//     if (!account || account.password !== password) {
//         return { errorNum: 2, message: 'Invalid password or username' };
//     }
//
//     var accountCopy = Hoek.clone(account);
//     delete accountCopy.password;
//
//     // authentic user resolved
//
//     return accountCopy;
// };


exports.register = function (server, options, next) {

    internals.boost = {
        'crumb': {
            source: 'payload',
            restful: true
        }
    };
    // Registration logic in internals.after will execute on
    // server start only after dependencies are fully registered.
    server.dependency(['AuthCookie', 'Crummy'], internals.after);

    next();
};


// All registration logic depends on other plugins (uses schemes and plugins-specific space),
// so we extract it to be fired after dependency resolution
internals.after = function (server, next) {

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
                },
                crumb: {
                    key: 'crumb',
                    source: 'payload',
                    restful: true
                }
            },
            validate: {
                payload: { // payload for POST, query for GET
                    username: Joi.string().min(3).max(6),
                    password: Joi.string().min(3).max(7),
                    crumb: Joi.string().min(3).max(130)
                }
            },
            handler: function (request, reply) {

                internals.getValidatedUser(request.payload.username, request.payload.password)
                    .then( function (user) {

                        request.auth.session.set(user);
                        return reply(user);
                    })
                    .catch( function (err) {

                        return reply(Boom.unauthorized(err.message)); // "oh, no!"
                    });
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
            plugins: {
                crumb: false
            },
            handler: function (request, reply) {

                // setTimeout( function () {

                request.auth.session.clear();

                return reply({ message: 'Logged out' });

                // }, 4000);
            }
        }
    });


    //    server.route({
    //        method: 'GET',
    //        path: '/logoutb',
    //        config: {
    //            auth: {
    //                strategy: 'university',
    //                scope: ['user', 'admin']
    //            },
    //            handler: function (request, reply) {
    //
    //                // setTimeout( function () {
    //
    //                request.auth.session.clear();
    //
    //                return reply({ message: 'Logged out' });
    //
    //                // }, 4000);
    //            }
    //        }
    //    });

    return next();
};

exports.register.attributes = {
        name: 'Login'
};
