var Hapi = require('hapi');
var Hoek = require('hoek');

var server = new Hapi.Server();

server.connection({port: 8000});

server.route(require('./routes'));

server.start(function (err) {

    Hoek.assert(!err, err);
    console.log(server.info.uri);
});
