'use strict';

const Server = require('./index');
const Fs = require('fs');

const internals = {};


const Configs = {
    server: {
        port: 8000,
        tls: {
            key: Fs.readFileSync('lib/certs/key.key'),
            cert: Fs.readFileSync('lib/certs/cert.crt')
        }
    },
    plugins: {}
};

Server.init(Configs)
    .then((server) => {

        console.log('Server startd at: ' + server.info.uri);
        console.log('Server started port:' + server.info.port);
    })
    .catch((err) => {

        console.log('server start up failed:!!! ' + err);
    });
