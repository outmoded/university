var Hapi = require('hapi');
var Hoek = require('hoek');
var internals = require('../package.json');

var server = new Hapi.Server();

server.connection({ port: 8000 });

server.route({
	method: 'GET',
	path: '/version',
	handler: function (request, reply) {
		response = {
			version: internals.version,
		}
		reply(response);
	}
});

server.start(function (err) {
	Hoek.assert(!err, err);
	console.log('Hapi server started!', server.info.uri);
});