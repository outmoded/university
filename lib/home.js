// Load modules

var Path = require('path');

// Declare internals

var internals = {};

exports.register = function (server, options, next) {

    // Registration logic in internals.after will execute on
    // server start only after dependencies are fully registered.
    server.dependency(['AuthCookie'], internals.after);

    next();
};


// All registration logic depends on other plugins (uses schemes and plugins-specific space),
// so we extract it to be fired after dependency resolution
internals.after = function (server, next) {

    server.views({
        engines: {
            html: require('handlebars')
        },
        path: '../views',
        partialsPath: '../views/partials',
        relativeTo: __dirname
    });


    // Static Assets


    server.route({
        method: 'GET',
        path: '/{assetpath*}',
        config: {
            description: 'Static Assets Route',
            auth: false,   // Turn off auth restrictions. Option: on locks down static assets.
            handler: {
                directory: {
                    path: './assets/'
                }
            }
        }
    });


    // Routes


    server.route({
        method: 'GET',
        path: '/home',
        config: {
            description: 'Returns the home page',
            auth: {
                mode: 'try',
                strategy: 'university'
            },
            plugins: {
                'hapi-auth-cookie': {
                    redirectTo: false // '/login' if set redirects to ./login.
                }
            },
            handler: function (request, reply) {

                // Already logged in
                var username = null;

                if (request.auth.isAuthenticated) {

                    // User logged in show user links.

                    username = { first: request.auth.credentials.first, last: request.auth.credentials.last };
                }

                return reply.view('home', { user: username });
            }
        }
    });


    server.route({
        method: 'GET',
        path: '/login',
        config: {
            description: 'Returns the login page',
            auth: {
                mode: 'try',
                strategy: 'university'
            },
            plugins: {
                'hapi-auth-cookie': {
                    redirectTo: false // if set redirects to set route.
                }
            },
            handler: function (request, reply) {

                // Already logged in

                if (request.auth.isAuthenticated) {
                    return reply.redirect('/account');
                }

                return reply.view('login');
            }
        }
    });


    server.route({
        method: 'GET',
        path: '/account',
        config: {
            auth: {
                strategy: 'university',
                scope: ['admin', 'user']
            },
            handler: function (request, reply) {

                // Admin check
                var administrator = null;

                if (request.auth.credentials.scope[0] === 'admin') {
                    administrator = true;
                }

                var userInfo = { first: request.auth.credentials.first, last: request.auth.credentials.last };

                return reply.view('account', { user: userInfo, admin: administrator });
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/admin',
        config: {
            auth: {
                strategy: 'university',
                scope: ['admin']
            },
            handler: function (request, reply) {

                return reply.view('admin');
            }
        }
    });

    return next();
};

exports.register.attributes = {
    name: 'Home'
};
