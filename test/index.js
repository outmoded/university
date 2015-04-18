// Load modules

var Code = require('code');
var Lab = require('lab');
var Server = require('../lib');
var Version = require('../lib/version');


// Test shortcuts

var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var expect = Code.expect;


describe('server init', function () {

    it('should start server on given port', function (done) {

        Server.init(8080, function (err, server) {

            expect(server.info.port).to.equal(8080);
            expect(err).to.be.undefined();
            server.stop(done);
        });
    });

    it('should start server on 8000 if no port given', function (done) {

        Server.init(function (err, server) {

            expect(server.info.port).to.equal(8000);
            expect(err).to.be.undefined();
            server.stop(done);
        });
    });

    it('should start server on 8000 if null given', function (done) {

        Server.init(null, function (err, server) {

            expect(server.info.port).to.equal(8000);
            expect(err).to.be.undefined();
            server.stop(done);
        });
    });

    it('should give error if plugin loading fails', function (done) {

        var register = Version.register;

        Version.register = function (server, options, next) {

            return next(new Error('foo error'));
        };

        Version.register.attributes = {
            name: 'foo'
        };

        Server.init(8080, function (err, server) {

            expect(err.message).to.equal('foo error');
            Version.register = register;
            server.stop(done);
        });
    });
});
