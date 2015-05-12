// Load modules

var Basic = require('hapi-auth-basic');
var Users = require('./users.json');


// Declare internals

var internals = {};


internals.validateFunc = function (username, password, callback) {

    var user = Users[username];
    if (!user || user.password !== password) {
        return callback(null, false);
    }

    user.username = username;

    return callback(null, true, user);
};


exports.register = function (server, options, next) {

    server.register(Basic, function (err) {

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

                    var html = '<div>Hello ' + request.auth.credentials.username + '</div>';
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
