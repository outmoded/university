var Auth = require('hapi-auth-basic');
var Users = require('./users.json');

// Declare internals

var internals = {};

internals.validate = function (username, password, callback) {

    var user = Users[username];

    if (!user){
        return callback(null, false);
    }

    if ( user.password === password ){
        callback(null, true, { username: user.name });
    }
    else {
        callback(null, false);
    }

};

exports.register = function (server, options, next) {

    server.register(Auth, function (err){

        server.auth.strategy('simple', 'basic', { validateFunc: internals.validate } );

        server.route({
            method: 'GET',
            path: '/private',
            config: {

                auth: 'simple',
                description: 'Returns the version of the server',
                handler: function (request, reply) {

                    return reply('<p> Welcome, ' + request.auth.credentials.username + '</p>');
                }
            }
        });

        return next();

    });

};

exports.register.attributes = {
    name: 'authentication'
};
