var Hapi = require('hapi');
var Package = require('../package.json');

var server = new Hapi.Server();

server.connection({ port: 8000 });

server.route ({
	method: 'GET',
	path: '/version',
	handler: function(request, reply){
		return reply({ version: Package.version });
	}
});
	
server.start(function () {
	console.log('Server running on port', server.info.port);
});
