// Load modules

var Code = require('code');
var Lab = require('lab');
var Hapi = require('hapi');
var Version = require('../lib/version');


// Declare internals

var internals = {};


// Test shortcuts

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var it = lab.test;
var expect = Code.expect;


describe('Version.register()', function () {

    it('registers /version route handler that returns version', function (done) {

        var server = new Hapi.Server();
        server.connection();

        server.register(Version, function (err) {

            expect(err).to.not.exist();

            server.inject('/version', function (res) {

                expect(res.statusCode).to.equal(200);
                expect(res.result).to.contain('version');
                expect(res.result.version).to.equal('0.0.2');

                server.stop(done);
            });
        });
    });
});
