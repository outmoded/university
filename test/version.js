// Load modules

var Code = require('code');
var Lab = require('lab');
var Pkg = require('../package.json');
var Lib = require('../lib');

// Test shortcuts

var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var expect = Code.expect;

describe('/version', function() {

    it('should return proper version', function(done) {

        Lib.init(8000, function(err, server) {

            expect(err).to.not.exist();
            server.inject('/version', function(response) {

                expect(response.statusCode).to.equal(200);
                expect(response.result).to.deep.equal({ version: Pkg.version });
            });

            server.stop(done);
        });
    });
});
