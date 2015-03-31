var Code = require('code');
var Lab = require('lab');
var Hapi = require('hapi');
var Version = require('../lib/version');

var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var expect = Code.expect;


describe('version', function() {
    it('shows version from package', function(done) {

        var server = new Hapi.Server();
        server.connection();
        server.register(Version, function(err) {
            expect(err).to.not.exist();

            server.inject('/version', function(res) {

                expect(res.result).to.deep.equal({ version: '0.0.3' });
                done();
            });
        });


    });
});
