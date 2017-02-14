'use strict';

const GenerateCrumb = require('./generateCrumb');

const internals = {};

// ./test/generateSessionCrumb.js
// generates a session satisfying crumb & hapi-auth-cookie requirements on requests.
// first:   gets a valid crumb to post requests.
// second:  adds the crumb headers to the request.
// third:   generate a hapi-auth-cookie session cookie user session.
// fourth:  returns the crumb and hapi-auth-cookie for the session.

module.exports = function (server, connectionLabel, injectOptions, callback) {

    // 1. generate crumb

    return GenerateCrumb(server, connectionLabel, (crumb) => {

        // load crumb configurations to request.

        injectOptions.headers = {};
        injectOptions.headers['x-csrf-token'] = crumb;
        injectOptions.headers.cookie = 'crumb=' + crumb;

        server.select(connectionLabel).inject(injectOptions, (res) => {

            if (res.result && res.result.error) {
                return callback(res.result, null);
            }

            const headerSplit = res.headers['set-cookie'][0].split('; ');
            const sessionCookie = headerSplit[0].match(/(?:[^\x00-\x20\(\)<>@\,;\:\\"\/\[\]\?\=\{\}\x7F]+)\s*=\s*(?:([^\x00-\x20\"\,\;\\\x7F]*))/);
            return callback(null, crumb, sessionCookie[1]);
        });
    });
};
