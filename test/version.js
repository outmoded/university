// Load modules

var Code = require('code');
var Lab = require('lab');
var lib = require('../lib');
var Pkg = require('../package.json');

// Lab shortcuts

var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var expect = Code.expect;

describe('version', function() {
    it('should return version details without errors', function (done) {

	lib.init(function (err, server) {

            expect(err).to.be.undefined();
            expect(server.info.port).to.equal(8000);
            server.inject('/version', function (response) {

                expect(response.statusCode).to.equal(200);
                expect(response.result.version).to.equal(Pkg.version);
                server.stop(done);
            });
	});
    });
});
