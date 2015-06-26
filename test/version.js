// Load modules

var Code = require('code');
var Lab = require('lab');
var Pkg = require('../package.json');
var University = require('../lib');
var Path = require('path');
var Config = require('../lib/config');

// Declare internals

var internals = {};

// Test shortcuts

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;

describe('/version', function () {

    it('ensures /version always redirected to use https', function (done) {

        University.init(internals.manifest, internals.composeOptions, function (err, server) {

            expect(err).to.not.exist();

            server.select('web').inject('/version', function (res) {

                expect(res.statusCode).to.equal(301);
                expect(res.headers.location).to.equal('https://localhost:8001/version');

                server.stop(done);
            });
        });
    });

    it('returns the version from package.json', function (done) {

        University.init(internals.manifest, internals.composeOptions, function (err, server) {

            expect(err).to.not.exist();

            server.select('web-tls').inject('/version', function (res) {

                expect(res.statusCode).to.equal(200);
                expect(res.result).to.deep.equal({ version: Pkg.version });

                server.stop(done);
            });
        });
    });
});

internals.manifest = {
    connections: [
        {
            host: 'localhost',
            port: 0,
            labels: ['web']
        },
        {
            host: 'localhost',
            port: 0,
            labels: ['web-tls', 'api'],
            tls: Config.tls
        }
    ],
    plugins: {
        './version': {}
    }
};

internals.composeOptions = {
    relativeTo: Path.resolve(__dirname, '../lib')
};
