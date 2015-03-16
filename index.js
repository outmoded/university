'use strict';
var server = require('./lib/server');

server.start(function() {
    console.log('Server started at', server.info.uri);
});
