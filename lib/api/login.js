var Hoek = require('hoek');
var Users = require('../users.json');
var Boom = require('boom');
var Joi = require('joi');


var internals = {};


// Promise method but node.js v0.10.0 d/n like this.
// internals.getValidateUserPromise = function (username, password){
//
//     return new Promise(function (resolve, reject){
//
//         var account = null;
//
//         // console.log(username);
//         // console.log(password);
//
//         account = Users[username];
//
//         if (!account || account.password !== password) {
//             throw { errorNum: 2, message: 'Invalid password or username' };
//         }
//
//         // Remove sensitive data from user cookie info
//
//         var accountCopy = Hoek.clone(account);
//         delete accountCopy.password;
//
//         // promise resolved
//
//         resolve(accountCopy);
//     });
// };


internals.getValidateUser = function (username, password){

    var account = null;

    account = Users[username];

    if (!account || account.password !== password) {
        return { errorNum: 2, message: 'Invalid password or username' };
    }

    var accountCopy = Hoek.clone(account);
    delete accountCopy.password;

    // authentic user resolved

    return accountCopy;
};

exports.register = function (server, options, next) {

    // Registration logic in internals.after will execute on
    // server start only after dependencies are fully registered.
    server.dependency(['AuthCookie'], internals.after);

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

                request.auth.session.set(user); // Success begin session and set cookie.

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
};

exports.register.attributes = {
        name: 'Login'
};
