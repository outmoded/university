var Hoek = require('hoek');
var Server = require('./lib/');


Server.init(function(err, server){

    Hoek.assert(!err, err);

    console.log('Server started at: '+ server.info.uri +'\n'+
                 'Using port: '+ server.info.port);
})
