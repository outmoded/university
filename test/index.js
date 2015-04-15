// Load modules

var Code = require('code');
var Lab = require('lab');
var Server = require('../lib');
var Version = require('../lib/version');

// Test shortcuts

var expect = Code.expect;
var lab = exports.lab = Lab.script();


lab.experiment('index', function() {

    lab.test('init function starts up server', function(done) {

        Server.init(9000, function(err, server) {

            expect(err).to.be.undefined();
            expect(server).to.be.an.object();

            server.stop(done);
        });
    });

    lab.test('if port is omitted use default port', function(done) {

        Server.init(function(_, server) {

            expect(server.info.port).to.be.equal(8000);
            server.stop(done);
        });
    });

    lab.test('should report an error if a plugin registration failed', function(done) {

        // For this to work with have to monkey-patch the version plugin to
        // raise an error.
        var oldVersion = Version.register;
        Version.register = function(server, options, next) {

            return next('Fake Plugin Error');
        };
        Version.register.attributes = {name: 'Fake Version Plugin'};

        Server.init(function(err, server) {

            Version.register = oldVersion;
            expect(err).to.be.equal('Fake Plugin Error');
            server.stop(done);
        });
    });
});
