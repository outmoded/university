// Load modules

var Code = require('code');
var Hapi = require('hapi');
var Lab = require('lab');
var Package = require('../package.json');
var Version = require('../lib/version');


// Test shortcuts

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var it = lab.it;
var expect = Code.expect;

describe('Version', function () {

    it('returns current version', function (done) {

        var server = new Hapi.Server().connection();
        server.register(Version, function (err) {

            expect(err).to.be.undefined();
            server.inject({ url: '/version' }, function (res) {

                expect(res.statusCode).to.equal(200);
                expect(res.result).to.deep.equal({ version: Package.version });
                done();
            });
        });
    });
});
