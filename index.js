var Hapi = require("hapi");
var pkginfo = require("./package.json");
var server = new Hapi.Server();

server.connection({port: 8000});

server.route({
  method: "GET",
  path: "/",
  handler: function(request, reply) {
    reply({ version: pkginfo.version });
  }
});

server.start(function() {
  console.log("Server is running at: ", server.info.uri);
});
