// Load modules

var Path = require('path');


// Declare internals

exports.register = function (server, options, next) {

    server.views({
        engines: {
            html: require('handlebars')
        },
    relativeTo: __dirname,
    path: '../views',
    layoutPath: '../views/layout',
    partialsPath: '../views/partials'
});

    server.route({
        method: 'GET',
        path: '/home',
        config: {
            description: 'Returns html page with the path of the html file',
            handler: function (request, reply) {

                reply.view('index');
            }
        }
    });

    return next();
};

exports.register.attributes = {
    name: 'home'
};

