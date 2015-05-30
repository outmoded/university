// Load modules

var Path = require('path');


// Declare internals

var internals = {};
internals.relativeHomePath = Path.relative('./', 'views/layouts/home.html');


exports.register = function (server, options, next) {

    server.views({
        engines: {
            'html': require('handlebars')
        },
        path: '../views/layouts',
        relativeTo: __dirname
    });

    server.route({
        method: 'GET',
        path: '/home',
        config: {
            description: 'Returns html page with the path of the html file',
            handler: {
                view: {
                    template: 'home',
                    context: {
                        path: internals.relativeHomePath
                    }
                }
            }
        }
    });

    return next();
};

exports.register.attributes = {
    name: 'home'
};

