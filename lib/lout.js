'use strict';

// Declare internals

const internals = {};

exports.register = (server, options, next) =>  {

    server.register([require('vision'), require('inert'), { register: require('lout') }], (err) => {

        if (!err){
            return next();
        }
    });
};

exports.register.attributes = {
    name: 'Lout'
};
