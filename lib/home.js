'use strict';

// Load modules

const Path = require('path');


// Declare internals

const internals = {
    rootPath: Path.resolve(__dirname, '../'),
    viewsPath: Path.resolve(__dirname, '../views')
};


exports.register = function (server, options, next) {

    // Code inside the callback function of server.dependency will only be
    // executed after vision and inert has been registered.  It's triggered by
    // server.start, and runs before the starting of the server.  It's done because
    // resources that utilize views depend on vision and inert.
    // Earlier versions of hapi included vision and inert out of hapi. Now, these must be included seperately.

    server.dependency(['inert', 'vision'], internals.after);

    return next();
};

exports.register.attributes = {
    name: 'Home'
};


internals.after = function (server, next) {

    server.views({
        engines: {
            html: require('handlebars')
        },
        path: '../views',
        partialsPath: '../views/partials',
        relativeTo: __dirname
    });

    // Routing for static files
    server.route([

        // Images

        {
            method: 'GET',
            path: '/images/{assetpath*}',
            handler: {
                directory: {
                    path: './assets/images'
                }
            }
        },

        // Scripts

        {
            method: 'GET',
            path: '/scripts/{assetpath*}',
            handler: {
                directory: {
                    path: './assets/scripts'
                }
            }
        },

        // Styles

        {
            method: 'GET',
            path: '/styles/{assetpath*}',
            handler: {
                directory: {
                    path: './assets/styles'
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
                handler: {
                    view: {
                        template: 'home'
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
