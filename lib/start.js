// Load modules

var Hoek = require('hoek');
var Server = require('./index');


// Declare internals

var internals = {};

var manifest = {
    
    connections: [
        {
            port: 8000,
        },
    ],
    plugins: {
        private: {
            version: false,
            plugins: '/'
        },
        version: [
            {
                select: ['b'],
                options: {
                    version: false,
                    plugins: '/'
                }
            }
        ]
    }
};

Server.init(manifest, function (err, server) {

    Hoek.assert(!err, err);
    console.log('Server started at: ' + server.info.uri);
});

