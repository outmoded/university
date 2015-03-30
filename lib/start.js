var Hoek = require('hoek');
var Server = require('../lib');

Server.init(8000, function initServer(err, server) {
  Hoek.assert(!err, err);
  console.log('Server started at:', server.info.uri);
});
