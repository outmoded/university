'use strict';

var Hoek = require('hoek');

var Index = require('./lib/index');
var Version = require('./lib/version');

var internals = {};

internals.start = function () {

    Index.init(8000, function(err, server) {

        Hoek.assert(!err, err);
        console.log('Server started at: ' + server.info.uri);
    });
};

internals.start();
