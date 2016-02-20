'use strict';

// Load modules

const Path = require('path');

// Declare internals

const internals = {
    rootPath: Path.resolve(__dirname, '../'),
    viewsPath: Path.resolve(__dirname, '../views')
};


exports.register = (server, options, next) => {

    // Code inside the callback function of server.dependency will only be
    // executed after vision and inert has been registered.  It's triggered by
    // server.start, and runs before the starting of the server.  It's done because
    // resources that utilize views depend on vision and inert.
    // Earlier versions of hapi included vision and inert out of hapi. Now, these must be included seperately.

    server.dependency(['vision', 'inert'], (server, next) => {

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
                            path: Path.relative(internals.rootPath, 'views/home.html')
                        }
                    }
                }
            }
        });

        return next();
    });

    return next();
};

exports.register.attributes = {
    name: 'Home'
};
