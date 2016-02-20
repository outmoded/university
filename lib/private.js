'use strict';


// Declare internals

const internals = {};


exports.register = (server, options, next) => {

    // Code inside the callback function of server.dependency will only be
    // executed after hapi-auth-basic has been registered.  It's triggered by
    // server.start, and runs before the starting of the server.  It's done because
    // the call to server.auth.strategy upon registration would fail and make the
    // server crash if the basic scheme is not previously registered by hapi-auth-basic.
    //
    // @note The plugin name used in server.dependency() is the name value registered in the
    // exports.register.attributes = { name: 'UniversityAuth'} of the university-auth plugin.
    server.dependency('UniversityAuth', (server, next) => {

        server.route({
            method: 'GET',
            path: '/private',
            config: {
                auth: 'basic',
                description: 'Returns a greeting message to the authenticated user',
                handler: (request, reply) => {

                    const html = '<div>Hello ' + request.auth.credentials.username + '</div>';
                    return reply(html);
                }
            }
        });

        return next();
    });

    return next();
};


exports.register.attributes = {
    name: 'Private'
};
