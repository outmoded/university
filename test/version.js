// Load modules

var Code = require('code');
var Lab = require('lab');
var Index = require('../lib');
var Pkg = require('../package.json');

var internals = {
  port: 3000
};

var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var expect = Code.expect;


describe('version', function() {

  it('Should return version number from package file', function (done) {

    Index.init(function (err, server) {

          expect(err).to.be.undefined();
          expect(server.info.port).to.equal(8000);

          server.inject({url: '/version'}, function (response) {

              expect(response.statusCode).to.equal(200);
              expect(response.result).to.deep.equal({ version: Pkg.version });

              server.stop(done);
          });
      });

  });

});
