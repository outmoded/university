'use strict';


// Declare internals

const internals = {};

const defaultValidateFunc = async (request, token) => {

    // catbox-redis cache used to confirm if token is valid.
    // * [catbox-redis](https://github.com/hapijs/catbox-redis)
    // * [catbox](https://github.com/hapijs/catbox)

    const authtoken = await request.server.app.authtokens.get(token);

    return {
        isValid: authtoken.value !== null,
        credentials: authtoken.value
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

