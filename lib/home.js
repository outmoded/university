// Load modules

var Path = require('path');

// Declare internals
var internals = {
    rootPath: Path.resolve('__dirname', '../'),
    viewsPath: Path.resolve('__dirname', '../views')
};

internals = {
    homePath: Path.relative(internals.rootPath,
                            Path.resolve(internals.viewsPath, 'home.html'))
};

exports.register = function(server, options, next) {

    server.views({
        engines: {
            'html': require('handlebars')
        },
        path: '../views',
        relativeTo: '__dirname'
    });

    server.route({
        method: 'GET',
        path: '/home',
        config: {
            description: 'Returns home page',
            handler: {
                view: {
                    template: 'home',
                    context: {
                        path: internals.homePath
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
