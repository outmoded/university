'use strict';

// Load modules

// Declare internals

const internals = {};

exports.register = (server, options, next) => {

    // Code inside the callback function of server.dependency will only be
    // executed after vision and inert has been registered.  It's triggered by
    // server.start, and runs before the starting of the server.  It's done because
    // resources that utilize views depend on vision and inert.
    // Earlier versions of hapi included vision and inert out of hapi. Now, these must be included seperately.

    server.dependency(['inert', 'vision', 'AuthCookie'], internals.after);

    return next();
};

exports.register.attributes = {
    name: 'Home'
};


internals.after = (server, next) => {

    server.views({
        engines: {
            html: require('handlebars')
        },
        path: '../views',
        partialsPath: '../views/partials',
        relativeTo: __dirname // process.cwd() // prefer this over __dirname when compiling to dist/cjs and using rollup
    });

    // Routing for static files

    server.route([

        // Images

        {
            method: 'GET',
            path: '/images/{assetpath*}',
            config: {
                description: 'Static image assets.',
                auth: { strategy: 'session', mode: 'try' },
                plugins: { 'hapi-auth-cookie': { redirectTo: false } },
                handler: {
                    directory: {
                        path: './assets/images'
                    }
                }
            }
        },

        // Scripts

        {
            method: 'GET',
            path: '/scripts/{assetpath*}',
            config: {
                description: 'Static js scripts assets.',
                auth: { strategy: 'session', mode: 'try' },
                plugins: { 'hapi-auth-cookie': { redirectTo: false } },
                handler: {
                    directory: {
                        path: './assets/scripts'
                    }
                }
            }
        },

        // Styles

        {
            method: 'GET',
            path: '/styles/{assetpath*}',
            config: {
                description: 'Stylesheet static assets.',
                auth: { strategy: 'session', mode: 'try' },
                plugins: { 'hapi-auth-cookie': { redirectTo: false } },
                handler: {
                    directory: {
                        path: './assets/styles'
                    }
                }
            }
        }
    ]);

    // Home related routing

    server.route([

        // Login route

        {
            method: 'GET',
            path: '/login',
            config: {
                description: 'Returns a login form',
                auth: { strategy: 'session', mode: 'try' },
                plugins: { 'hapi-auth-cookie': { redirectTo: false } },
                handler: {
                    view: {
                        template: 'login'
                    }
                }
            }
        },

        // Home route

        {
            method: 'GET',
            path: '/home',
            config: {
                description: 'Returns the home page',
                auth: { strategy: 'session', mode: 'try' },
                plugins: { 'hapi-auth-cookie': { redirectTo: false } },
                handler: (request, reply) => {

                    // Already logged in?

                    let userData = null;

                    if (request.auth.isAuthenticated) {

                        // User logged in show user links.

                        userData = { username: request.auth.credentials.username, email:  request.auth.credentials.username };
                    }

                    return reply.view('home', { user: userData });
                }
            }
        },

        {
            method: 'GET',
            path: '/account',
            config: {
                description: 'Returns the home page',
                auth: {
                    strategy: 'session',
                    mode: 'try',
                    scope: ['user', 'admin']
                },
                handler: (request, reply) => {

                    let administrator = null;

                    if (request.auth.credentials.scope[0] === 'admin') {
                        administrator = true;
                    }

                    const userInfo = {
                        username: request.auth.credentials.username,
                        email: request.auth.credentials.email
                    };

                    return reply.view('account', { user: userInfo, admin: administrator });
                }
            }
        },

        {
            method: 'GET',
            path: '/admin',
            config: {
                description: 'Returns main admin control panel.',
                auth: { strategy: 'session', mode: 'try', scope: ['admin'] },
                handler: {
                    view: {
                        template: 'admin'
                    }
                }
            }
        }
    ]);

    return next();
};

exports.register.attributes = {
    name: 'Home'
};
