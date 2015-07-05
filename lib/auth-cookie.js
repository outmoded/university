// Load modules

// Declare internals

var internals = {};

exports.register = function (server, options, next) {

    server.dependency('hapi-auth-cookie', function (server, next){

        server.auth.strategy('university', 'cookie', {
            password: 'secret',
            ttl: 60 * 1000,
            cookie: 'hapi-university',
            clearInvalid: true,
            redirectTo: '/login',
            isSecure: true
        });

        // Blacklist all routes.
        server.auth.default({
              strategy: 'university'
        });

        return next();
    });

    return next();
};

exports.register.attributes = {
    name: 'Auth-cookie'
};
