var Hapi = require('hapi'); 

var file = require('../package.json'); 

var server = new Hapi.Server(); 

server.connection({
    host: '0.0.0.0',
    port: 8000  
 }); 
  
 server.route({
     method: 'GET', 
     path: '/version', 
     handler: function (request, reply) {
         reply({ version: file.version }) 
    } 
 }); 
  
server.start(function () {
    console.log('Server running at:', server.info.uri);
});  
