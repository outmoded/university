// Load modules

var Hapi = require('hapi');
var Glue = require('glue'); 


// Declare internals

var internals = {};

var composeOptions = {
    relativeTo: __dirname
};


exports.init = function (manifest, glueOptions) {

    var server = new Hapi.Server();
    Glue.compose.bind(Glue, manifest, composeOptions);
};
