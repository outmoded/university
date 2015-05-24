// Load modules

var Hapi = require('hapi');
var Glue = require('glue'); 


// Declare internals

var internals = {};

var composeOptions = {
    relativeTo: __dirname
};

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


exports.init = function (manifest, glueOptions) {

    var server = new Hapi.Server();
    Glue.compose.bind(Glue, manifest, composeOptions);
};
