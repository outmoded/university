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
        path: '../views',
        partialsPath: '../views/partials'
    });

    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: 'assets'
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/home',
        config: {
            description: 'Returns the home page',
            handler: function (request, reply) {

                reply.view('home');
            }
        }
    });


    server.route({
        method: 'GET',
        path: '/login',
        config: {
            description: 'Returns the login page',
            handler: function (request, reply) {

                reply.view('login');
            }
        }
    });

    return next();
};

exports.register.attributes = {
    name: 'Home'
};
