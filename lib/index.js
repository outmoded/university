'use strict';

// Index for basic http server

// Dependencies
var Hapi = require('hapi');
var Hoek = require('hoek');

// Internal objects
var internals = {};

// Add pkg to internals
if (!internals.hasOwnProperty('pkg')){

    internals = {
	pkg: require('../package.json')
    }
}

// Create a server
var server = new Hapi.Server();

// Creates a connection
server.connection({ port: process.env.PORT || 8000 });

// Routes
server.route({
    method: 'GET',
    path: '/version',
    config: {
	description: 'Get version of the application',

	handler: function(request, reply){

	    // Preparing the response
	    var response = {
		version: internals.pkg.version
	    }

	    return reply(response);
	}
    }
});


server.start(function(err){

    Hoek.assert(!err, err);
    
    // Log the running server
    console.log('Server is running at ' + server.info.uri);
});
