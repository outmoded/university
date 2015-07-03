// Load modules

// Declare internals

var internals = {};


exports.register = function (server, options, next) {

    server.auth.strategy('university', 'cookie', {
        password: 'hapi_university_is_great', // cookie secret
        cookie: 'university-cookie', // Cookie name
        redirectTo: '/login',
        isSecure: 'false',
        clearInvalid: true,
        ttl: 60 * 1000
    });

    server.auth.default({
        strategy: 'university'
    });

    return next();
};

exports.register.attributes = {
    name: 'Auth-cookie'
};
