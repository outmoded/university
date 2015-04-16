// Load modules

var Code = require('code');
var Lab = require('lab');
var Pkg = require('../package.json');
var Lib = require('../lib');
var Version = require('../lib/version');

// Test shortcuts

var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var expect = Code.expect;

describe('lib', function() {

    it('should run on any defined port', function(done) {

        Lib.init(1234, function(err, server) {

            expect(err).to.not.exist();
            expect(server.info.port).to.equal(1234);

            server.stop(done);
        });
    });

    it('should fail if plugin does not register', function(done) {

        var register = Version.register;
        Version.register = function(server, options, next) {

            return next(new Error('Plugin registration failed'));
        };

        Version.register.attributes = {
            name: 'version'
        };

        Lib.init(8000, function(err, server) {

            expect(err).to.exist();

            Version.register = register;
            server.stop(done);
        });
    });
});
