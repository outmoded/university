// Load modules

var Code = require('code');
var Lab = require('lab');
var Pkg = require('../package.json');
var Hueniversity = require('../lib');


// Test shortcuts

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;

// Declaring internals

var internals = {};
internals.defaultManifest = {
    connections: [
        { port: 0 }
    ]
};

describe('/version', function () {

    it('returns the version from package.json', function (done) {

        Hueniversity.init(internals.defaultManifest, function (err, server) {

            expect(err).to.not.exist();

            server.inject('/version', function (res) {

                expect(res.statusCode).to.equal(200);
                expect(res.result).to.deep.equal({ version: Pkg.version });

                server.stop(done);
            });
        });
    });
});
