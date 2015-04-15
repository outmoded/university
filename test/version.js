var Code = require('code');
var Lab = require('lab');
var Package = require('../package.json');
var Server = require('../lib/index');

// test shortcuts
var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var expect = Code.expect;

describe('Version plugin/route', function () {

  it('should return version on GET /version', function (done) {

      Server.init(null, function initIndex(err, server) {

        expect(err, 'error').to.not.exist();

        var get = {
          method: 'GET',
          url: '/version'
        };

        server.inject(get, function (res) {

          expect(res.statusCode, 'statusCode').to.equal(200);
          expect(res.result, 'response').to.deep.equal({
            version: Package.version
          });

          server.stop(done);
        });
      });
  });
});
