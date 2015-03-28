var Index = require('./index');
var Hoek = require('hoek');
Index.init(8000, function(err, server){
    Hoek.assert(!err, err);
    console.log('Server started at: ' + server.info.uri);
    return server;
});
