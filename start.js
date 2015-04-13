var Init = require('./lib/index.js').init;
var Hoek = require('hoek');

Init(8000, function (err, server) {

    Hoek.assert(!err, err);
    console.log('Server started at: ', server.info.port);
});
