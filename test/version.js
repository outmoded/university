// Load modules

var Code = require('code');
var Hapi = require('hapi');
var Lab = require('lab');
var Pkg = require('../package.json');
var Server = require('../lib');
var Version = require('../lib/version');

// Test shortcuts

var expect = Code.expect;
var lab = exports.lab = Lab.script();

// Declare tests

lab.experiment('version', function() {

    lab.test('can be registered', function(done) {

        var server = new Hapi.Server();
        server.connection({port: 8000});

        server.register(Version, function(err) {

            expect(err).to.be.undefined();
            server.stop(done);
        });
    });

    lab.test('version endpoint returns the correct version', function(done) {
        Server.init(8000, function(_, server) {
            server.inject({url: '/version'}, function(res) {

                expect(res.statusCode).to.be.equal(200);
                expect(res.payload).to.be.equal(JSON.stringify({version: Pkg.version}));

                server.stop(function() {

                    done();
                });
            });
        });
    });
});
