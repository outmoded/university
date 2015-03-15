var Hapi = require('hapi'),
    routes = require('./routes');

var server = new Hapi.Server();
server.connection({ port: 8000 });

server.route(routes.version);

server.start(function () {
  console.log("Server running at port ", server.info.port);
});
