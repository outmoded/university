'use strict';

const internals = {};

exports.plugin = {
    name: 'tokencache',
    version: '1.0.0',
    description: 'catbox policies for authtokens and active users',
    register: async (server, options) => {

        await server.cache.provision({ engine: require('catbox-redis'), name: 'authtokens' });
        await server.cache.provision({ engine: require('catbox-redis'), name: 'active' });

        // authtokens cache policy

        const policyOptions = {
            cache: 'authtokens',
            expiresIn: options.expiresIn,
            getDecoratedValue: true
        };

        const cache = server.cache(policyOptions);

        server.app.authtokens = cache;

        // active user policy

        const activeUserPolicyOptions = {
            cache: 'active',
            expiresIn: options.expiresIn,
            getDecoratedValue: true
        };

        const activeCache = server.cache(activeUserPolicyOptions);

        server.app.active = activeCache;
    }
};
