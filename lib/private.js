// Load modules

var HapiAuthBasic = require('hapi-auth-basic');
var Users = require('./users.json');

// Declare internals

var internals = {};

internals.validate = function (username, password, callback) {

    var user = Users[username];
    if (!user || password !== user.password) {
        return callback(null, false);
    }

    return callback(null, true, { user: user });
};

exports.register = function(server, options, next) {

    server.register(HapiAuthBasic, function (err) {

        if (err) {
            return next(err);
        }

        server.auth.strategy('simple', 'basic', { validateFunc: internals.validate });

        server.route({
            method: 'GET',
            path: '/private',
            config: {
                description: 'This is a private endpoint',
                auth: 'simple',
                handler: function(request, reply) {

                    var html = 'Welcome ' + request.auth.credentials.user.username;
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
