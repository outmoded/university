// Load modules

var Code = require('code');
var Lab = require('lab');
var Index = require('../lib/index');
var Version = require('../lib/version');


// Declare internals

var internals = {};


// Test shortcuts

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var it = lab.test;
var expect = Code.expect;


describe('Index.init()', function () {

    it('returns a started hapi server', function (done) {

        Index.init(null, function (err, server) {

            expect(err).to.not.exist();

            expect(server.info.started).to.be.above(0);

            server.stop(done);
        });
    });

    it('handles plugin registration errors', function (done) {

        var register = Version.register;

        Version.register = function (server, options, next) {
            next('plugin registration failed');
        };

        Version.register.attributes = {
            name: 'versionMock'
        };

        Index.init(0, function (err, server) {

            expect(err).to.equal('plugin registration failed');

            Version.register = register;

            server.stop(done);
        });
    });
});
