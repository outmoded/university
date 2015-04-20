var Basic = require('hapi-auth-basic');
var Server = require('./index'); 

// Load modules

var Pkg = require('../package.json');


// Declare internals

var internals = {};


exports.register = function (server, options, next) {
    
    var validate = function (username, password, callback) {
    var user = users[username];
    
        if (!user) {
        return callback(null, false);
       }      
    }; 
    
    server.register(Basic, function (err) {
    server.auth.strategy('simple', 'basic', { validateFunc: validate });
    server.route({
        method: 'GET',
        path: '/private',
        config: {
            auth: 'simple',
            handler: function (request, reply) {
                reply('hello, ' + request.auth.credentials.name);
            }
        }
    });
    });
    
    exports.register.attributes = {};

};











    
    