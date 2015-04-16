var Hoek = require('hoek');
var Lib = require('./index');


Lib.init(8000, function(err, server){

    Hoek.assert(!err, err);
    console.log('Server started at: '+ server.info.uri +'\n'+
                'Using port: '+ server.info.port);
})
