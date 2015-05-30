// Load modules

var Code = require('code');
var Lab = require('lab');
var Pkg = require('../package.json');
var University = require('../lib');


// Declare internals

var internals = {};


// Test shortcuts

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;


describe('/version', function () {

    it('returns the version from package.json', function (done) {

        University.init(internals.defaultServer, function (err, server) {

            expect(err).to.not.exist();

            server.inject('/version', function (res) {

                expect(res.statusCode).to.equal(200);
                expect(res.result).to.deep.equal({ version: Pkg.version });

                server.stop(done);
            });
        });
    });
});


internals.defaultServer = {
    connections: [
        {
            port: 0
        }
    ]
};
