// Load modules

var Hapi = require('hapi');
var Hoek = require('hoek');
var Version = require('./version');


// Declare internals

var internals = {};


exports.init = function (err, data) {
    
    if (err) { 
      callback(err, null )
    }

    var server = new Hapi.Server();
    server.connection({ port: Number(data) || 8000 });
    server.register(Version, function (err) {

        if (err) {
            callback(err, null); 
        }

        server.start(function (err) {

            if (err) {
                callback(err, null); 
            
            }
            console.log('Server started at: ' + server.info.uri);
        });
    });
};

internals.init() ;

