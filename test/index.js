// Load modules
var Code = require('code');
var Hapi = require('hapi');
var Hoek = require('hoek');
var Lab = require('lab');
var Init = require('../lib/index').init;

// Declare internals

var internals = {};


// Test shortcuts

var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var expect = Code.expect;


describe('index.js', function () {

    it('should listen on given port', function (done) {

		var port = 8002;
		Init(port, function (err, server) {

			expect(err, 'err').not.to.exist();
			expect(server.info.port, 'port').to.equal(port);
			server.stop(done);
		});

    });

    it('should listen on default port when port is null', function (done) {

		Init(null, function (err, server) {

			expect(err, 'err').not.to.exist();
			expect(server.info.port, 'port').to.equal(8000);
			server.stop(done);
		});

    });
    it('should listen on default port when port is undefined', function (done) {

		Init(undefined, function (err, server) {

			expect(err, 'err').not.to.exist();
			expect(server.info.port, 'port').to.equal(8000);
			server.stop(done);
		});

    });

    it('should listen on default port when given only a callback', function (done) {

		Init(function (err, server) {

			expect(err, 'err').not.to.exist();
			expect(server.info.port, 'port').to.equal(8000);
			server.stop(done);
		});

    });

    it('returns an error when a plugin fails to register', function (done) {

		// Replace the register function to force an error that can be caught by init()
        // Make sure to backup the old register function and set it back!
        var Version = require('../lib/version');

        var backupRegister = Version.register;

        Version.register = function (server, options, next) {

            return next('Error');
        };

        Version.register.attributes = {
            name: 'Error test'
        };

        Init(function(err, server) {

            expect(err, 'error').to.equal('Error');
            expect(server, 'server').to.not.exist();

            Version.register = backupRegister;
            done();
        });

    });
});
