// Load modules

var Code = require('code');
var Lab = require('lab');
var lib = require('../lib');
var Version = require('../lib/version');


// Declare internals

var internals = {
    port: 1337
};


// Test shorctucts
var lab = exports.lab = Lab.script();
var expect = Code.expect;

lab.experiment('init', function () {

    lab.test('should create a server on port 8000 if no port is given', function (done) {

        lib.init(function (err, server) {

            expect(err).to.be.undefined();
            expect(server.info.port).to.equal(8000);
            server.stop(done);
        });
    });

    lab.test('should allow you to specify a port', function (done) {

        lib.init(internals.port, function (err, server) {

            expect(err).to.be.undefined();
            expect(server.info.port).to.equal(internals.port);
            server.stop(done);
        });
    });

    lab.test('plugin errors are handled properly', function (done) {

        var register = Version.register;

        Version.register = function (server, options, next) {

            next('Error loading version plugin');
        };

        Version.register.attributes = {
            name: 'Fake Name'
        };

        lib.init(function (err, server) {

            expect(err).to.equal('Error loading version plugin');
            Version.register = register;
            return done();
        });
    });
});
