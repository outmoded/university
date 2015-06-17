// Load modules

var Path = require('path');

// Declare internals

var internals = {};


exports.register = function (server, options, next) {


    // Code inside the callback function of server.dependency will only be executed
    // after AuthCookie plugin has been registered. It's triggered by server.start,
    // and runs before actual starting of the server.  It's done because the call to
    // server.route upon registration with auth:'cookie' config would fail and make
    // the server crash if the basic strategy is not previously registered by Auth.
    server.dependency('AuthCookie', function (server, next){


        // Future, put global view config into static plugin
        server.views({
            engines: {
                html: require('handlebars')
            },
            path: '../views',
            partialsPath: '../views/partials',
            relativeTo: __dirname
        });

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

                        username = { first: 'Jon', last: 'Swenson' };
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
                        redirectTo: false // '/login' if set redirects to ./login.
                    }
                },
                handler: function (request, reply) {

                    // Already logged in
                    if (request.auth.isAuthenticated) {
                        return reply.redirect('/account').code(301);
                    }

                    return reply.view('login');
                }
            }
        });

        return next();
    });

    return next();
};

exports.register.attributes = {
    name: 'Home'
};
