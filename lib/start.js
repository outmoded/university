// Load modules

var Hoek = require('hoek');
var Server = require('./index');
var Users = require('./users.json');


// Declare internals

var internals = {
    config: {
        port: 8000,
        users: Users
    }
};


Server.init(internals.config, function (err, server) {

    Hoek.assert(!err, err);
    console.log('Server started at: ' + server.info.uri);
});

