// Load modules

var Code = require('code');
var Lab = require('lab');
var index = require('../lib/index');
var Version = require('../lib/version');

// Declare internals

var internals = {
    port: 8001
};

// Test shortcuts

var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var expect = Code.expect;

// Test lib

describe('index', function() {

    it('Should just create a server', function (done) {

        return index.init(0, function (err, server) {

            expect(err).to.be.undefined();
            expect(server).to.be.an.object();

            server.stop(done);
        });
    });

    it('Should create server on a defined port, ' + internals.port, function (done) {

        return index.init(internals.port, function(err, server) {

            expect(err).to.be.undefined();
            expect(server.info.port).to.equal(internals.port);
            server.stop(done);
        });
    });

    it('Should not start a server when plugin registration fails', { parallel: false }, function (done) {

	var register = Version.register;

	Version.register = function (server, options, next) {

            return next(new Error('Error'));
        };

        Version.register.attributes = {
            name: 'Random Name'
        };

        return index.init(0, function (err, server) {

            expect(err, 'error').to.be.an.instanceOf(Error);
            expect(err.message, 'error message').to.be.equal('Error');
            expect(server).to.not.exist();

            Version.register = register;

            done();
        });
    });
});
