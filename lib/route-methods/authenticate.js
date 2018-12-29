'use strict';

const Boom = require('boom');
const Database = require('../database');
const Cryptiles = require('cryptiles');


exports.handler = function (request, h) {

    if (request.pre.welcome.message === 'welcome') {

        return request.pre.welcome;
    }

    return Boom.unauthorized('invalid credentials');
};

exports.authenticateUser = function (request, h) {

    const result = Database.authenticate(request.payload.username, request.payload.password);

    if (result.authentic === true) {

        // @todo set cache records here (catbox-redis).
        // @todo prempt multiple authtokens
        // check if user already authenticated. If yes, return current authtoken.
        // @todo generate token here (cryptiles)

        const randomAuthToken = Cryptiles.randomString(36);

        const welcome = { message: 'welcome', token: randomAuthToken };

        return welcome;
    }

    return 'invalid user credentials';
};

