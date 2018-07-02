const Hapi = require("hapi");

(async ()=>{

       const server = Hapi.server(
         {
           host:"localhost",
           port:Number(process.argv[2]||"8000")
         }
       );

      server.route({path:"/version",method:"Get",handler:(request,h)=>{

          return "version";

      }

      }
      );

   await server.start();

   console.log("Hapi server starts: ",server.info.port);


})()
