'use strict'

//Import lib

const Hapi = require("hapi");
const Package = require("../package.json");
//Make declaration

(async ()=>{

       const server = new Hapi.server({port:Number(process.env.PORT||"8000")});

       server.route({
         path:"/version",
         method:"Get",
         handler:function(request,h){

          return h.response({version:Package.version});

      }
      }
      );

   await server.start();

   console.log("Hapi server starts: ",server.info.port);


})()
