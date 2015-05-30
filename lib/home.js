// Load modules

var Path = require('path');


// Declare internals

var internals = {};
internals.viewePath = Path.relative('./', 'views/home.html');


exports.register = function (server, options, next) {

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
            handler: {
                view: {
                    template: 'home',
                    context: {
                        path: internals.viewePath
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
