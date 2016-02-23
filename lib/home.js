'use strict';

// Load modules

const Path = require('path');


// Declare internals

const internals = {
    rootPath: Path.resolve(__dirname, '../'),
    viewsPath: Path.resolve(__dirname, '../views')
};


exports.register = function (server, options, next) {

    // Code inside the callback function of server.dependency will only be executed
    // after vision plugin has been registered. It's triggered by server.start,
    // and runs before actual starting of the server.  It's done because the call to
    // server.views upon registration would fail and make the server crash if the
    // server is not previously decorated with the views method by vision.
    server.dependency('vision', internals.after);

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
        relativeTo: __dirname
    });

    server.route({
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
    });

    return next();
};
