// Load modules

var Hapi = require('hapi');
var Version = require('./version');
var Private = require('./private');

// Declare internals

var internals = {};


exports.init = function (config, next) {

    if (!config || typeof (config) !== 'object'){
        return next(new Error('mandatory configuration object not provided'));
    }

    var server = new Hapi.Server();
    server.connection({ port: config.port });

    server.register([Version, {register: Private, options: {users: config.users}}], function (err) {

        if (err) {
            return next(err);
        }

        server.start(function (err) {

            return next(err, server);
        });
    });
};
