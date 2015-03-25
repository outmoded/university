// Load modules

var Code = require('code');
var Lab = require('lab');
var lib = require('../lib');
var Version = require('../lib/version');


// Declare internals

var internals = {
    port: 1337
};


// Test shortcuts

var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var expect = Code.expect;

describe('lib', function() {

    describe('.init()', function () {

        it('should properly handle an error if the plugin does not load correctly', function (done) {

            var register = Version.register;

            Version.register = function (server, options, next) {
                next('I like to break stuff');
            };

            Version.register.attributes = {
                name: 'Fakey Mc Fakerson'
            };

            lib.init(0, function (err, server) {

                expect(err).to.equal('I like to break stuff');
                Version.register = register;
                server.stop(done);
            });
        });

        it('should allow you to specify a port', function (done) {

            lib.init(internals.port, function (err, server) {

                expect(err).to.be.undefined();
                expect(server.info.port).to.equal(internals.port);
                server.stop(done);
            });
        });
    });
});
