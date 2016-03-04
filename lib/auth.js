'use strict';

// Load modules

const Users = require('./users.json');


// Declare internals

const internals = {};


exports.register = (server, options, next) => {

    // Code inside the callback function of server.dependency will only be
    // executed after hapi-auth-basic has been registered.  It's triggered by
    // server.start, and runs before actual starting of the server.  It's done because
    // the call to server.auth.strategy upon registration would fail and make the
    // server crash if the basic scheme is not previously registered by hapi-auth-basic.
    server.dependency('hapi-auth-basic', internals.after);

    return next();
};

exports.register.attributes = {
    name: 'Auth'
};

internals.validateFunc = (request, username, password, callback) => {

    const user = Users[username];
    if (!user || user.password !== password) {
        return callback(null, false);
    }

    user.username = username;

    return callback(null, true, user);
};


internals.after = (server, next) => {

    server.auth.strategy('basic', 'basic', { validateFunc: internals.validateFunc });
    return next();
};
