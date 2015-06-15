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
        relativeTo: __dirname,
        path: internals.viewsPath,
        partialsPath: internals.viewsPath + '/partials'
    });

    server.route({
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
    });

    server.route({
        method: 'GET',
        path: '/login',
        config: {
            description: 'Returns the login page',
            handler: {
                view: {
                    template: 'login'
                }
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/{p*}',
        config: {
            description: 'Returns assets',
            handler: {
                directory: {
                    path: 'assets'
                }
            }
        }
    });

    return next();
};

exports.register.attributes = {
    name: 'Home'
};
