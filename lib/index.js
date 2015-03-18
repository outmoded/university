var Hapi = require("hapi");
var Package = require("../package.json");
var server = new Hapi.Server();

var internals = {
    package: Package
};

server.connection({port: 8000});

server.route({
    method: "GET",
    path: "/version",
    config: {
        description: 'Reply with version of this package',
        handler: function(request, reply) {
            return reply({ version: internals.package.version });
        }
    }
});

server.start(function() {
    console.log("Server is running at: ", server.info.uri);
});
