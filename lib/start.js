'use strict';

// Load modules
const Hoek = require('hoek');
const Init = require('./index');

//run the server
Init(8000, (err, server) => {

    Hoek.assert(!err, err);
    console.log('Server started at: ' + server.info.uri);
});