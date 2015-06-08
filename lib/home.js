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


    //   CONFIG STATIC FILES INCLUDE
    //   image files, javascripts, and images
    //   warning could cause conflicts with prefixed plugins
    server.route({
        method: 'GET',
        path: '/{assetpath*}',
        handler: {
            directory: {
                path: './assets/'
            }
        }
    });


    server.route({
        method: 'GET',
        path: '/',
        config: {
            description: 'Returns the index for website',
            handler: function (request, reply) {

                return reply.redirect('/home').code(301);
            }
        }
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

    return next();
};

exports.register.attributes = {
    name: 'Home'
};
