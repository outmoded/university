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

function count(x, limit) {
  if( x > limit) return;
  if( x % 3 == 0) {
    if((x % 5 == 0) && (x % 2 != 0)) {
      console.log(x);
    }
  }
  count(x + 1, limit);
}

function outputNumbers(divisible, notDivisible) {
  for(i=0; i< 100; i++) {
    if((i % divisible) && !(i % notDivisible)) {
      console.log(i);
    } else {
      console.log("skipping " + i);
    }
  }


}


server.start(function() {
  count(1, 100);
  console.log("Server is running at: ", server.info.uri);
});
