'use strict';

module.exports = (server, connectionLabel, callback) => {

    server.select(connectionLabel).inject({ method: 'GET', url: '/generate' }, (res) => {

        const headerSplit = res.headers['set-cookie'][0].split('; ');
        const crumbCleaned = headerSplit[0].match(/(?:[^\x00-\x20\(\)<>@\,;\:\\"\/\[\]\?\=\{\}\x7F]+)\s*=\s*(?:([^\x00-\x20\"\,\;\\\x7F]*))/);

        return callback(crumbCleaned[1]);
    });
};
