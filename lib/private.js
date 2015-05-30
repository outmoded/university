// Load modules

var Users = require('./users.json');


// Declare internals

var internals = {};


exports.register = function (server, options, next) {

    server.dependency('Auth', function (server, next) {

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

    return next();
};


exports.register.attributes = {
    name: 'Private'
};
