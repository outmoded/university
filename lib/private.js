// Load modules

var Basic = require('hapi-auth-basic');
var UsersData = require('./users.json');

// Declare internals

var internals = {};


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
                description: 'Returns welcome message with the authenticated username',
                auth: 'simple',
                handler: function (request, reply) {

                    var username = request.auth.credentials.username;
                    return reply(internals.response(username));
                }
            }
        });

        return next();
    });
};

exports.register.attributes = {
    name: 'private'
};

internals.validate = function (username, password, callback) {

    var user = UsersData[username];
    if (user && user.password === password) {
        return callback(null, true, user);
    }

    return callback(null, false);
};

internals.response = function (username) {

    return '<p>Welcome ' + username + ' we are hapi to see you back</p>';
};
