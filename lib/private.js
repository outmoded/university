// Load modules

var Basic = require('hapi-auth-basic');
var Users = require('./users.json');


// Declare Internals

var internals = {};


internals.validateFunc = function (username, password, callback) {

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

        server.auth.strategy('simple', 'basic', { validateFunc: internals.validateFunc });
        server.route({
            method: 'GET',
            path: '/private',
            config: {
                description: 'Returns response to authenticating user.',
                auth: 'simple',
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
    name: 'private'
};
