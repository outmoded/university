'use strict'

//Import lib

const Hapi = require("hapi");
const Package = require("../package.json");
//Make declaration

(function (){

       const server = new Hapi.server();

       server.connection({port:Number(process.env.PORT||"8000")});
       server.route({
         path:"/version",
         method:"Get",
         handler:function(request,response){

          return response({version:Package.version});

      }
      }
      );

   server.start();

   console.log("Hapi server starts: ",server.info.port);


})()
