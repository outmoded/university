// Load modules

var Package = require('../package.json');

exports.register = function (server, options, next) {

    server.route({
        method: 'GET',
        path: '/',
        config: {
	    description: 'Returns the version of the server',
	    handler: function (request, reply) {
		
                return reply({ version: Package.version });
	    }
        }
    });
    
    next();
}

exports.register.attributes = {
    name: 'versionPlugin',
    version: '0.0.1'
};
