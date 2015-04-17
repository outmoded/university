// Load modules

var Code = require('code');
var Lab = require('lab');
var index = require('../lib/index');
var Pkg = require('../package.json');

// Lab shortcuts

var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var expect = Code.expect;

describe('version', function() {
    it('When GET /version server should return version details', function (done) {

	return index.init(0, function (err, server) {

            expect(err).to.be.undefined();

            return server.inject('/version', function (response) {

                expect(response.statusCode).to.equal(200);
                expect(response.result.version).to.equal(Pkg.version);

                server.stop(done);
            });
	});
    });
});
