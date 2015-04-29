// Load modules
var Basic = require('hapi-auth-basic');
var Users = require('./users');


// Declare internals

var internals = {};

internals.validate = function (username, password, callback) {

    var user = Users[username];
    if (!user || user.password !== password) {
        return callback(null, false);
    }

    return callback(null, true, user);
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
                description: 'Returns welcome page protected by basic auth',
                auth: 'simple',
                handler: function (request, reply) {

                    return reply('<span>Hello ' + request.auth.credentials.username + '</span>');
                }
            }
        });

        return next();
    });
};

exports.register.attributes = {
    name: 'private'
};
