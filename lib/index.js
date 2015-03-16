var Hapi = require('hapi');
var fs = require('fs');

var package = {};
var port = process.env.PORT || 8000;
var server = new Hapi.Server();

server.connection({
    port: port
});

server.route({
    method: 'GET',
    path:'/version',
    handler: function (request, reply) {
       reply({"version": package.version});
    }
});

fs.readFile('./package.json', 'utf8', function (err, data) {
   if (err) {
      return console.log("Error reading package.json");
   }
   package = JSON.parse(data);
   server.start(function () {
      console.log("Server started on " + port);
   });
});
