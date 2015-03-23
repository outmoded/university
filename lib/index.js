// Load modules

var Hapi = require('hapi');
var Hoek = require('hoek');
var Version = require('./version');
var Package = require('../package.json');


// Declare internals

var internals = {};


internals.init = function () {

    var server = new Hapi.Server();
    server.connection({ port: 8000 });

    server.register(Version, function(err){
       if(err){
           console.log("Couldn't load plugin" + err);
           process.exit(1);
       }
    });

    server.start(function (err) {

        Hoek.assert(!err, err);
        console.log('Server started at: ' + server.info.uri);
    });
};

internals.init();
