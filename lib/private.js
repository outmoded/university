// Load modules

var HapiAuthBasic = require('hapi-auth-basic');
var Users = require('./users.json');


// Declare internals

var internals = {};

internals.validate = function (username, password, callback) {

    var user = Users[username];
    if (!user) {
        return callback(null, false);
    }

    var isValid = password === user.password;

    return callback(null, isValid, { username: user.username });
};


exports.register = function (server, options, next) {

    server.register(HapiAuthBasic, function (err) {

        if (err) {
            return next(err);
        }

        server.auth.strategy('simple', 'basic', { validateFunc: internals.validate });

        server.route({
            method: 'GET',
            path: '/private',
            config: {
                description: 'Returns a protected endpoint',
                auth: 'simple',
                handler: function (request, reply) {

                    return reply('<h1>Welcome ' + request.auth.credentials.username + '</h1>');
                }
            }
        });

        return next();
    });
};

exports.register.attributes = {
    name: 'private'
};
