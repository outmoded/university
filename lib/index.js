// Load modules

var Hapi = require('hapi');
var Hoek = require('hoek');
var Package = require('../package.json');

// Declare internals

var internals = {};

internals.init = function () {

    var server = new Hapi.Server();
    server.connection({ port: 8000 });

    server.register([
    {
        register: require('./version'),
        options: {version: Package.version}
    },{
        register: require('./description'),
        options: {description: "Hapi University"}
    }
    ], function (err) {
      Hoek.assert(!err, err);
    });

    server.start(function (err) {

        Hoek.assert(!err, err);
        console.log('Server started at: ' + server.info.uri);
    });
};

internals.init();
