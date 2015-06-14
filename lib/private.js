exports.register = function (server, options, next) {

    // Code inside the callback function of server.dependency will only be executed
    // after Auth plugin have been registered. It's triggered by server.start,
    // and runs before actual starting of the server.  It's done because the call to
    // server.route upon registration with auth:'basic' config would fail and make
    // the server crash if the basic strategy is not previously registered by Auth.
    server.dependency('Auth', function (server, next){

        server.route({
            method: 'GET',
            path: '/private',
            config: {
                auth: 'basic',
                description: 'Returns a greeting message to the authenticated user',
                handler: function (request, reply) {

                    var html = '<div>Hello ' + request.auth.credentials.username + '</div>';
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
