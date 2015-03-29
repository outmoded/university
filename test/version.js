var Code = require('code');
var Lab = require('lab');
var Package = require('../package.json');
var index = require('../lib/index');


// Test shortcuts

var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var expect = Code.expect;


describe('Version plugin', function () {

    it('GET /version returns right server version', function (done) {

        return index.init(null, function (err, server) {

            expect(err, 'error').to.not.exist();

            return server.inject('/version', function (response) {

                expect(response.statusCode, 'statusCode').to.equal(200);
                expect(response.result, 'response').to.deep.equal({ version: Package.version });

                server.stop(done);
            });
        });
    });
});
