var config, fs = require('fs');

config = {
	host: 'localhost',
	http: { port: 8000 },
	tls: {
		port: 8001,
		ca: [],
		key: fs.readFileSync('./lib/certs/university.key'),
		cert: fs.readFileSync('./lib/certs/university.pem')
	}
};

module.exports = config;
