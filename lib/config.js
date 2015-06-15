var Config, Fs = require('fs');

Config = {
	host: 'localhost',
	http: { port: 8000 },
	tls: {
		port: 8001,
		ca: [],
		key: Fs.readFileSync('./lib/certs/university.key'),
		cert: Fs.readFileSync('./lib/certs/university.pem')
	}
};

module.exports = Config;
