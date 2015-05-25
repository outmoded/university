// Load modules

var Home = require('./home');

// Declare internals

var internals = {};


exports.register = function (server, options, next) {

    server.register(Home, function (err) {

        if (err) {
            return next(err);
        }
     }); 

    server.views({
          engines: {
              html: require('handlebars')
         },
         path: Path.join(__dirname, 'views')
     });
   
   server.route({
       method: 'GET',
       path: '/home',
       handler: function (request, reply) {
        reply.view('home');
       }
   })
};

exports.register.attributes = {
    name: 'Private'
};
