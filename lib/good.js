'use strict';

// Load modules

const Good = require('good');

// Declare internals

const internals = {};

exports.register = (server, options, next) =>  {

    exports.options = options; // TODO: find where export is used

    server.register({ register: Good, options }, (err) => {

        if (err) {
            return next(err);
        }

        return next();
    });
};

exports.register.attributes = {
    name: 'Good'
};
