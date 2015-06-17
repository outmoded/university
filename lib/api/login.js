

var internals = {};


exports.register = function (server, options, next) {


    // Code inside the callback function of server.dependency will only be executed
    // after AuthCookie plugin has been registered. It's triggered by server.start,
    // and runs before actual starting of the server.  It's done because the call to
    // server.route upon registration with auth:'cookie' config would fail and make
    // the server crash if the basic strategy is not previously registered by Auth.
    server.dependency('AuthCookie', function (server, next){

         server.route({
             method: 'POST',
             path: '/login',
             config: {
                 description: 'Returns the login page',
                 auth: {
                     mode: 'try',
                 strategy: 'university'
                 },
                 plugins: {
                      'hapi-auth-cookie': {
                          redirectTo: false // do not redirect to ./login if not logged in.
                      }
                 },
                 handler: function (request, reply) {

                      // console.log('delay ran');
                      return reply({ message: 'Here is the message', test: 'data sent'});
                  } 
             }

         });
    });
});
