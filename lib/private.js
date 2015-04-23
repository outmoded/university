// Load modules

var Basic = require('hapi-auth-basic');

// Declare internals

var internals = {
    response: {
        template: '<html><head><title>private page</title></head><body>Greetings %username%. Welcome to the private section.</body></html>',
        generate: function (username){

            return this.template.replace('%username%', username);
        }
    },
    authStrategyName: 'private-basic',
    authValidate: function(users, username, password, callback) {

        var candidateUser = users.filter(function(userObject){

            return userObject.username === username && userObject.password === password;
        });
        var user = candidateUser.length ? candidateUser[0] : null;
        if (!user) {
            return callback(null, false);
        }
        return callback(null, true, {username: user.username});
    }
};


exports.register = function (server, options, next) {

    var users = options.users;
    if (users === null || users === undefined){
        return next(new Error('private plugin requires users to be provided as option'));
    }
    if (!users.filter || !typeof (users.filter) === 'function'){
        return next(new Error('provided users option must have a filter method'));
    }

    server.register(Basic, function(err){
        if (err) {
            return next(err);
        }
        server.auth.strategy(internals.authStrategyName, 'basic', { validateFunc: internals.authValidate.bind(internals, users) });

        server.route({
            method: 'GET',
            path: '/private',
            config: {
                auth: internals.authStrategyName,
                description: 'Returns a welcome message if user successfully authenticated via basic auth',
                handler: function (request, reply) {

                    return reply(internals.response.generate(request.auth.credentials.username));
                }
            }
        });

        return next();
    });
};

exports.register.attributes = {
    name: 'private'
};
