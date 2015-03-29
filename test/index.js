// Load modules

var Code = require('code');
var Lab = require('lab');
var lib = require('../lib');
var Version = require('../lib/version');

// Declare internals

var internals = {
    defaultPort: 8000,
    port: 8001
};

// Test shortcuts

var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var expect = Code.expect;

// Test lib

describe('lib', function() {

    it('Should create server on default port, ' + internals.defaultPort, function (done) {

        lib.init(function (err, server) {

            expect(err).to.be.undefined();
            expect(server.info.port).to.equal(internals.defaultPort);
            server.stop(done);
        });
    });

    it('Should create server on a defined port, ' + internals.port, function (done) {

        lib.init(internals.port, function(err, server) {

            expect(err).to.be.undefined();
            expect(server.info.port).to.equal(internals.port);
            server.stop(done);
        });
    });

    it('Should not start a server when plugin registration fails', function (done) {

	var register = Version.register;

	Version.register = function (server, options, next) {

            next('Errored');
        };

        Version.register.attributes = {
            name: 'Random Name'
        };

        lib.init(function (err, server) {

            expect(err).to.equal('Errored');
            expect(server).to.not.exist();

            Version.register = register;

            done();
        });
    });

    it('Should create server on a defined port, ' + internals.port, function (done) {

        lib.init(internals.port, function(err, server) {

            expect(err).to.be.undefined();
            expect(server.info.port).to.equal(internals.port);
            server.stop(done);
        });
    });
});
