// Load modules

var Users = require('./users.json');


// Declare internals

var internals = {};


internals.validateFunc = function (username, password, callback) {

    var user = Users[username];
    if (!user || user.password !== password) {
        return callback(null, false);
    }

    user.username = username;

    return callback(null, true, user);
};


exports.register = function (server, options, next) {

    server.dependency('hapi-auth-basic', function (server, next) {

        server.auth.strategy('basic', 'basic', { validateFunc: internals.validateFunc });

        return next();
    });

    return next();
};


exports.register.attributes = {
    name: 'Auth'
};
