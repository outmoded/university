'use strict';

// Index for basic http server

// Dependencies

var Hapi = require('hapi');


// Internal links
var internals = {
    pkg: require('./package.json')
}

// Create a server
var server = new Hapi.Server();


// Creates a connection

server.connection({ port: process.env.PORT || 8000 });

// Routes


server.route({
    method: 'GET',
    path: '/version',
    handler: function(request, reply){
	
	// Return the version of the application

	return reply({ verison: internals.pkg.version });
    }
});


server.start(function(err){
    if (err){
	
	throw err;
    }

    // Log the running server
    console.log('Server is running at ' + server.info.uri);
});
