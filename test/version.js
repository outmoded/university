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

    var server = new Hapi.Server();
    server.connection();

    it('successfully loads', function(done) {
        server.register(Version, function(err) {
            expect(err).to.not.exist();

            done();
        });

    });

    it('registers routes', function(done) {
        var plugins = server.table();

        expect(plugins).to.have.length(1);
        expect(plugins[0].table[0].path).to.equal('/version');

        done();
    });

    it('replys with the package version', function(done) {
        var options = {
            method: 'GET',
            url: '/version'
        };

        server.inject(options, function(response) {
            var result = response.result;

            expect(response.statusCode).to.equal(200);
            expect(result).to.be.instanceof(Object);
            expect(result.version).to.be.equal(Package.version);

            done();
        });

    });
});
