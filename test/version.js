// Load modules

var Code = require('code');
var Lab = require('lab');
var Server = require('../lib');
var Pkg = require('../package.json');


// Test shortcuts

var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var expect = Code.expect;


describe('/version', function () {

    it('returns the version from package.json', function (done) {

        Server.init(8000, function (err, server) {

            expect(err).to.be.undefined();

            server.inject('/version', function (res) {

                expect(res.statusCode).to.equal(200);
                expect(res.result.version).to.equal(Pkg.version);
                server.stop(done);
            });
        });
    });
});
