// Load modules

var Path = require('path');

// Declare internals

var internals = {
    rootPath: Path.resolve(__dirname, '../'),
    viewsPath: Path.resolve(__dirname, '../views')
};


exports.register = function (server, options, next) {

    // Future, put global view config into static plugin
    server.views({
        engines: {
            html: require('handlebars')
        },
        path: '../views',
        partialsPath: '../views/partials',
        relativeTo: __dirname
    });

    // Routing for static files
    server.route({
        method: 'GET',
        path: '/{assetpath*}',
        handler: {
            directory: {
                path: './assets/'
            }
        }
    });

    // Home related routing
    server.route([

        // Index route

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
