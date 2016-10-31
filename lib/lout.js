'use strict';
const Lout = require('lout');

// Declare internals

const internals = {};

exports.register = (server, options, next) => {

    server.register({ register: Lout, options }, (err) => {

        if (err) {
            return next(err);
        }

        return next();
    });
};

exports.register.attributes = {
    name: 'Lout',
    dependencies: ['inert', 'vision']
};
