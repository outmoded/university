var Hapi = require('hapi');
var server = module.exports = new Hapi.Server();

server.connection({ port: process.env.PORT || 8000 });

server.route(require('./routes'));
