// Load modules

var Hoek = require('hoek');
var Server = require('./index');

// Declare internals

var internals = {};

internals.manifest = {
    connections: [
        {
            port: 3000
        }
    ],
    plugins: {
        './version': {},
        './private': {},
       
       
    }
};

internals.composeOptions = {
    relativeTo: __dirname
};

exports.init = function (manifest, options, callback) {
    
    Server.init(manifest, options, function () {

    Hoek.assert(!err, err);
    console.log('Server started at: ' + server.info.uri);
        
    }); 
};





