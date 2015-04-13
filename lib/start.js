var Hoek = require('hoek');
var Index = require('./index');

Index.init(8000, function (error, server) {

  Hoek.assert(!error, error)
  console.log('Server started at: ' + server.info.uri);
});
