'use strict';
const Lout = require('lout');

// Declare internals

const internals = {};

exports.register = (server, options, next) => {

    // Code inside the callback function of server.dependency will only be
    // executed after vision and inert has been registered.  It's triggered by
    // server.start, and runs before the starting of the server.  It's done because
    // resources that utilize views depend on vision and inert.
    // Earlier versions of hapi included vision and inert out of hapi. Now,
    // these must be included seperately.

    server.dependency(['inert', 'vision'], internals.after(server, next));

    // return next();
};


internals.after = (server, next) => {

    server.register(Lout, (err) => {

        if (!err){
            return next();
        }

        return next();
    });
};

exports.register.attributes = {
    name: 'Lout'
};
