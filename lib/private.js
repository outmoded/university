// Load modules

var Users = require('./users.json');

// Declare internals

var internals = {
    validate: function (username, password, callback) {

        var user = Users[username];
        if (!user) {
            return callback(null, false);
        }

        return callback(null, password === user.password, { id: user.id, username: user.username });
    }
};

exports.register = function (server, options, next) {

    server.auth.strategy('simple', 'basic', { validateFunc: internals.validate});
    server.route({
        method: 'GET',
        path: '/private',
        config: {
            auth: 'simple',
            description: 'Authenticate and return username',
            handler: function (request, reply) {

                return reply('<html><body><p>Hello ' + request.auth.credentials.username + '</p></body></html>');
            }
        }
    });

    return next();
};

exports.register.attributes = {
    name: 'private'
};
