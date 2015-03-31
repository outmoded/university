var Index = require('./lib/index');
var Hoek = require('hoek');

Index.init(8000, function(err, server) {

    console.log('Server started at: ' + server.info.uri);
});
