
var Hoek = require('hoek');
var index = require('./lib/index');


index.init(null, function (err, server) {

    Hoek.assert(!err, err);
    console.log('Server started at: '+ server.info.uri);
    console.log('Server port is: '+ server.info.port);
});


