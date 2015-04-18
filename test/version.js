var Hapi = require('hapi');
var Version = require('../lib/version');
var Package = require('../package.json');
var Code = require('code');
var Lab = require('lab');
var lab = exports.lab = Lab.script();

var describe = lab.describe;
var it = lab.it;
var before = lab.before;
var after = lab.after;
var expect = Code.expect;

describe('Version Plugin', function () {

    it('successfully loads', function(done) {

        var server = new Hapi.Server();
        server.connection();

        server.register(Version, function(err) {

            expect(err).to.not.exist();
            done();
        });

    });

    it('replys with the package version', function(done) {

        var server = new Hapi.Server();
        server.connection();

        server.register(Version, function(err) {

            server.inject('/version', function(response) {

                var result = response.result;

                expect(response.statusCode).to.equal(200);
                expect(response.result).to.deep.equal( { version: Package.version } );

                done();
            });
        });
    });
});
