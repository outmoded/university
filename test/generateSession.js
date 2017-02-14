'use strict';

// ./test/generateSession.js
// Use to get hapi-auth-cookie session id cookie value in order to test restricted routes.
// Only works if crumb is not registered on the application.
// If crumb registered, use ./test/generateSessionCrumb.js.

module.exports = function (server, connectionLabel, injectOptions, callback) {

    server.select(connectionLabel).inject(injectOptions, (res) => {

        if (res.result && res.result.error) {
            return callback(res.result, null);
        }

        const headerSplit = res.headers['set-cookie'][0].split('; ');
        const cookieCleaned = headerSplit[0].match(/(?:[^\x00-\x20\(\)<>@\,;\:\\"\/\[\]\?\=\{\}\x7F]+)\s*=\s*(?:([^\x00-\x20\"\,\;\\\x7F]*))/);
        return callback(null, cookieCleaned[1]);
    });
};
