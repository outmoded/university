'use strict';


// Declare internals

const internals = {};

const defaultValidateFunc = (request, token) => {

    // Put database query to authenticate the token is valid here.

    return {
        isValid: token === '1234574',
        credentials: { token }
    };
};

exports.plugin = {
    name: 'authtoken',
    version: '1.0.0',
    description: 'register hapi-auth-bearer-token strategy.',
    register: function (server, options) {

        server.auth.strategy('default', 'bearer-access-token', {
            validate: defaultValidateFunc
        });

        server.auth.default('default');
    }
};

