var Code = require('code');
var Lab = require('lab');
var Server = require('../lib/index');
var Version = require('../lib/version');

// test shortcuts
var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var expect = Code.expect;

var internals = {
  port: 9999
};

describe('Server initialization', function () {

  it('should return a server on the specified port', function (done) {

    Server.init(internals.port, function (err, server) {

      expect(err).to.be.undefined();
      expect(server.info.port).to.be.equal(internals.port);
      server.stop(done);
    });
  });

  it('should return a server with the default port', function(done){

    Server.init(function (err, server) {

      expect(err).to.be.undefined();
      expect(server.info.port).to.be.equal(8000);
      server.stop(done);
    });
  });

  // This one has been really tricky.
  // Needed to get the coverage percentage up.
  // Been using a lot of the other PR's to get to this.
  it('should return an error if registering a plugin fails', function (done) {

    var backupRegister = Version.register;

    // Rewrite the Version plugin register function
    // so it errors on register
    Version.register = function (server, options, next) {

      // Intentionally broken plugin
      return next('Error');
    };

    Version.register.attributes = {
      name: 'I am required but fake and broken'
    };

    Server.init(function (err, server) {

      expect(err).to.be.equal('Error');
      expect(server.info.port).to.equal(8000);
      // set back
      Version.register = backupRegister;

      server.stop(done);
    });

  });

});
