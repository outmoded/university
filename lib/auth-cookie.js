'use strict';

// Declare internals

const internals = {};

exports.register = (server, options, next) => {

    // Code inside the callback function of server.dependency will only be
    // executed after hapi-auth-cookie has been registered.  It's triggered by
    // server.start, and runs before actual starting of the server.  It's done because
    // the call to server.auth.strategy upon registration would fail and make the
    // server crash if the basic scheme is not previously registered by hapi-auth-cookie.

    server.dependency(['hapi-auth-cookie'], internals.after);
    return next();
};

exports.register.attributes = {
    name: 'AuthCookie'
};

exports.options = internals.options = {
    cacheOptions: { segment: 'sessions', expiresIn: 3 * 24 * 60 * 60 * 1000 },
    password: 'y00y-00m3-m4k1-z00m-y00y-00m3-m4k1-z00m-',
    cookie: 'sid-example',
    redirectTo: '/home',
    isSecure: true
};

internals.after = (server, next) => {

    const cache = server.cache(internals.options.cacheOptions);

    server.app.cache = cache;  // note! set server.app.cache which is catbox.cache.
                               // see server.cache docs. read about catbox policy.

    server.auth.strategy('session', 'cookie', true, {
        password: internals.options.password, // must be length 32 hapi v13 requirement.
        cookie: internals.options.cookie,
        redirectTo: internals.options.redirectTo,
        isSecure: internals.options.isSecure,
        validateFunc: (request, session, callback) => {

            cache.get(session.sid, (err, cached) => {

                if (err) {
                    return callback(err, false);
                }

                if (!cached) {

                    // session expired exception.

                    return callback(null, false);
                }

                return callback(null, true, cached.account);
            });
        }
    });

    return next();
};
