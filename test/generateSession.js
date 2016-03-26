'use strict';

// generateSession creates a new session with the server by sending a request
// using the passed in injectOptions. If the request is authenticated, the server
// should create a new session and return a valid auth cookie header.

// generateSession then extracts the cookie from the header so that it can be
// be sent by subsequent requests in your test

module.exports = function (server, connectionLabel, injectOptions, callback) {

    // sends a request to the server to create a new authenticated session
    server.select(connectionLabel).inject(injectOptions, (res) => {

        if (res.result && res.result.error) {
            return callback(res.result, null);
        }

        // extracts the returned auth cookie from the response headers so it can be used later
        const headerSplit = res.headers['set-cookie'][0].split('; ');
        const cookieCleaned = headerSplit[0].match(/(?:[^\x00-\x20\(\)<>@\,;\:\\"\/\[\]\?\=\{\}\x7F]+)\s*=\s*(?:([^\x00-\x20\"\,\;\\\x7F]*))/);

        return callback(null, cookieCleaned[1]);
    });
};
