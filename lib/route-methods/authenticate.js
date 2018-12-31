'use strict';

const Boom = require('boom');
const Database = require('../database');
const Cryptiles = require('cryptiles');

exports.handler = function (request, h) {

    if (request.pre.welcome.result === 'welcome') {

        return request.pre.welcome;
    }

    return Boom.unauthorized('invalid credentials');
};

exports.authenticateUser = async function (request, h) {

    const result = Database.authenticate(request.payload.username, request.payload.password);

    if (result.authentic === true) {

        // check if user already authenticated. If yes, return current authtoken.

        const activeuser = await request.server.app.active.get(request.payload.username);

        if (activeuser.value !== null) {

            return { result: 'welcome',  message: 'you already registered a token!', token: activeuser.value.authtoken };
        }

        const randomAuthToken = Cryptiles.randomString(36);

        const authTokenCacheRecord = {
            username: result.userRecord.username,
            email: result.userRecord.email,
            scope: result.userRecord.scope
        };

        await request.server.app.authtokens.set(randomAuthToken, authTokenCacheRecord);

        const activeCacheRecord = {
            authtoken: randomAuthToken,
            username: result.userRecord.username,
            email: result.userRecord.email,
            scope: result.userRecord.scope
        };

        await request.server.app.active.set(result.userRecord.username, activeCacheRecord);

        const welcome = { result: 'welcome', message: 'successful authentication', token: randomAuthToken };

        return welcome;
    }

    return 'invalid user credentials';
};
