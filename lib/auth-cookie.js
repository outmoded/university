
// Declare internals

var internals = {};


exports.register = function (server, options, next) {

    // Code inside the callback function of server.dependency will only be
    // executed after hapi-auth-basic have been registered.  It's triggered by
    // server.start, and runs before actual starting of the server.  It's done because
    // the call to server.auth.strategy upon registration would fail and make the
    // server crash if the basic scheme is not previously registered by hapi-auth-basic.
    server.dependency('hapi-auth-cookie', function (server, next){

        server.auth.strategy('university', 'cookie', {
            password: 'secret',
            ttl: 60 * 1000,
            cookie: 'hapi-university',
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
        name: 'AuthCookie'
};
