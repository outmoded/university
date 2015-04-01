// Load modules

var Code = require('code');
var Lab = require('lab');
var Lib = require('../lib');
var Version = require('../lib/version');

// Test shortcuts

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var it = lab.test;
var expect = Code.expect;

describe('index', function () {

    it('should create a server', function (done) {

        Lib.init(0, function(err, server) {

            expect(server.info.port).to.be.above(0);
            server.stop(done);
        });
    });

    it('should fail plugin registration', function (done) {

        var register = Version.register;

        Version.register = function(server, options, next) {
            next('Plugin Error');
        };

        Version.register.attributes = {name: 'Fake Plugin'};

        Lib.init(0, function(err, server) {

            expect(err).to.equal('Plugin Error');
            Version.register = register;
            server.stop(done);
        });
    });
});
