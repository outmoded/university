var Init = require('./lib/index.js').init;
var Hoek = require('hoek');

Init(8000, function (errors, server) {

	//remove undefined from errors array
	var idx = errors.indexOf(undefined);
    while (idx !== -1) {
		errors.splice(idx, 1);
		idx = errors.indexOf(undefined);
    }
    Hoek.assert(!errors.length, 'no errors should be thrown');

    console.log('Server started at: ', server.info.port);
});
