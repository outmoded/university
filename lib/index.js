'use strict'

//Import lib

const Hapi = require("hapi");
const Package = require("../package.json");
//Make declaration

(async ()=>{

       const server = new Hapi.server(
         {
           host:"localhost",
           port:Number(process.argv[2]||"8000")
         }
       );

      server.route({path:"/version",method:"Get",handler:function(request,response){

          return response({version:Package.version});

      }

      }
      );

   await server.start();

   console.log("Hapi server starts: ",server.info.port);


})()
