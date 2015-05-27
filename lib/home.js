// Load modules

var Path = require('path');


// Declare internals

var internals = {};
internals.viewePath = Path.relative('./', 'views/home.html');


exports.register = function (server, optinos, next) {

    server.views({
        engines: {
            html: require('handlebars')
        },
        relativeTo: __dirname,
        path: '../views'
    });

    server.route({
        method: 'GET',
        path: '/home',
        config: {
            description: 'Home path',
            handler: function (request, reply) {

                reply.view('home', {
                    path: internals.viewePath
                });
            }
        }
    });

    return next();
};

exports.register.attributes = {
    name: 'home'
};
