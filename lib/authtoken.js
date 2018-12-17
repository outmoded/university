'use strict';


// Declare internals

const internals = {};

const defaultValidateFunc = (request, token) => {

    // (here) Future assignment will use catbox-redis cache to confirm if token is valid.
    //        [catbox-redis](https://github.com/hapijs/catbox-redis)
    //        [catbox](https://github.com/hapijs/catbox)

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

