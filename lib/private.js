// Load modules

var Basic = require('hapi-auth-basic');
var Util = require('util');
var Hoek = require('hoek');
var Users = require('./users.json');


// Declare internals

var internals = {};


internals.validate = function (username, password, callback) {

    var matchingUsers = Users.filter(function (account) {

        return account.username === username && account.password === password;
    });

    if (matchingUsers.length) {
        return callback(null, true, matchingUsers[0]);
    }
    return callback(null, false);
};


exports.register = function (server, options, next) {

    server.register(Basic, function (err) {

        if (err) {
            return next(err);
        }

        server.auth.strategy('simple', 'basic', { validateFunc: internals.validate });

        server.route({
            method: 'GET',
            path: '/private',
            config: {
                description: 'Returns a welcome message to the authenticated user',
                auth: 'simple',
                handler: function (request, reply) {

                    return reply(Util.format('Hello, %s!', Hoek.escapeHtml(request.auth.credentials.username)));
                }
            }
        });

        return next();
    });
};

exports.register.attributes = {
    name: 'private'
};
