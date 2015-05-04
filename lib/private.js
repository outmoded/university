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

    return callback(null, true, user);
}

internals.response = function (username) {

    return '<h2>Welcome ' + username +'</h2>'
}

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
                auth: 'simple',
                description: 'routes to a private user space',
                handler: function(request, reply) {
                    
                    var user = request.auth.credentials.username;
                    return reply(internals.response(user));
                }
            }
        });

        return next();
    });
}

exports.register.attributes = {
    name: 'private'
};
