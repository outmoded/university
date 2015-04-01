var Code = require('code');
var Lab = require('lab');

var Index = require('../lib/index');
var Pkg = require('../package.json');

var lab = exports.lab = Lab.script();
var describe = lab.describe;
var expect = Code.expect;
var it = lab.it;

describe('version.js', function() {

    it('returns correct version', function(done) {

        Index.init(function(err, server) {

            expect(err).to.be.undefined();
            expect(server).to.be.object();

            server.inject({
                method: 'GET',
                url: '/version'
            }, function(res) {
                expect(res.statusCode).to.equal(200);
                expect(res.result).to.be.deep.equal({ version: Pkg.version });
                done();
            });
        });
    });
});
