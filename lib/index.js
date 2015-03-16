'use strict';

var Hapi = require('hapi');

var internals = {
  pkg: require('../package.json');
};

var server = new Hapi.Server();

server.connection({ port: 8000 });

server.route ({
    method: 'GET',
    path: '/version',
    config: {
      handler: function (request, reply) {

        reply ({ version: internals.pkg.version });
      }
    }

});

server.start (function (err) {

    if (err) {
      throw (err);
    };

    console.log('Server running at:', server.info.port);
});
