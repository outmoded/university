// Load modules

var Code = require('code');
var Lab = require('lab');
var Server = require('../lib');
var Version = require('../lib/version');

// Test shortcuts

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var it = lab.test;
var expect = Code.expect;

describe('index', function () {

    it('should create a server with default port', function (done) {

        Server.init(function(err, server) {

            expect(server.info.port).to.equal(8000);
            server.stop(done);
        });
    });

    it('should create a server with specific port', function (done) {

        Server.init(3000, function(err, server) {

            expect(server.info.port).to.equal(3000);
            server.stop(done);
        });
    });

    it('should fail plugin registration', function (done) {

        var oldRegister = Version.register;

        Version.register = function(server, options, next) {
            next('Plugin Error');
        };

        Version.register.attributes = {name: 'Fake Plugin'};

        Server.init(function(err, server) {

            expect(err).to.equal('Plugin Error');
            Version.register = oldRegister;
            server.stop(done);
        });
    });
});
