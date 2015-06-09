// Load modules

var Path = require('path');

// Declare internals

var internals = {
    rootPath: Path.resolve(__dirname, '../'),
    viewsPath: Path.resolve(__dirname, '../views')
};


exports.register = function (server, options, next) {

    server.views({
        engines: {
            html: require('handlebars')
        },
        path: '../views',
	partialsPath: '../views/partials',
        relativeTo: __dirname
    });

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
                        template: 'home',
                        context: {
                            path: Path.relative(internals.rootPath, Path.resolve(internals.viewsPath, 'home.html'))
                        }
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
