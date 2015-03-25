// Load modules

var Code = require('code');
var Lab = require('lab');
var lib = require('../lib');
var Pkg = require('../package.json');


// Declare internals

var internals = {
    port: 8000
};


// Test shortcuts

var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var expect = Code.expect;


describe('version', function() {

    it('should return expected data', function (done) {

        lib.init(internals.port, function (err, server) {

            expect(err).to.be.undefined();
            expect(server.info.port).to.equal(internals.port);
            server.inject('/version', function (response) {

                expect(response.statusCode).to.equal(200);
                expect(response.result.version).to.equal(Pkg.version);
                server.stop(done);
            });
        });
    });
});
