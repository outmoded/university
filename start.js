var Server = require('./lib/');
var Hoek = require('hoek');

Server.init(8000, function(err, server) {

    Hoek.assert(!err, err);
    console.log('Server started at: ' + server.info.uri);
});
