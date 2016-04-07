//add modules dependencies
const Hapi = require('hapi');
const Pkg = require('../package.json');

//create the server
const server = new Hapi.Server();

//set the connection on port 8000
server.connection({
    port: 8000
});

//route the /version path
server.route({
        method: 'GET',
        path: '/version',
        handler:  (request, reply) => {
            //object to be returned
            var json = {};
            //set version property to version value if any or 'unknwon' otherwise
            json.version = Pkg.version || "Unknown";
            //stringfy and return
            return reply(JSON.stringify(json));
        }
});

//.. and start the server
server.start(function () {
    console.log(server.info.uri);
});