// Load modules

var Code = require('code');
var Lab = require('lab');
var Lib = require('../lib');
var Version = require('../lib/version');


// Declare internals

var internals = {
    port: 0
};


// Test shortcuts

var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var expect = Code.expect;

describe('Lib', function() {

    describe('init()', { parallel: false }, function () {

        it('should properly handle an error if the plugin does not load correctly', function (done) {

            var register = Version.register;

            Version.register = function (server, options, next) {
                next('I like to break stuff');
            };

            Version.register.attributes = {
                name: 'Fakey Mc Fakerson'
            };

            Lib.init(0, function (err, server) {

                expect(err).to.equal('I like to break stuff');
                Version.register = register;
                server.stop(done);
            });
        });

        it('should allow you to specify a port', function (done) {

            Lib.init(internals.port, function (err, server) {

                expect(err).to.be.undefined();
                server.stop(done);
            });
        });
    });
});
