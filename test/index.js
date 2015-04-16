var Code = require('code');
var Lab = require('lab');

var Index = require('../lib/index');
var Version = require('../lib/version');

var lab = exports.lab = Lab.script();
var describe = lab.describe;
var expect = Code.expect;
var it = lab.it;

describe('index.js', function() {

    it('Should not require port to start on default port', function(done) {

        Index.init(function(err, server) {

            expect(err).to.be.undefined();
            expect(server).to.be.object();
            expect(server.info.port).to.be.a.number();
            server.stop(done);
        });
    });

    it('Should start server correctly on specified port', function(done) {
        var port = 6000;

        Index.init(port, function(err, server) {

            expect(err).to.be.undefined();
            expect(server).to.be.object();
            expect(server.info.port).to.equal(port);
            server.stop(done);
        });
    });

    //Peeked at other people's solution
    it('Should report error when plugin registration fails', function(done) {

        var register = Version.register;

        Version.register = function(server, options, next) {

            next('An error');
        };

        Version.register.attributes = {
            name: 'An error'
        };

        Index.init(null, function(err, server) {

            expect(err).to.be.equal('An error');
            expect(server).to.be.object();
            expect(server.info.port).to.be.a.number();

            Version.register = register;

            server.stop(done);
        });
    });
});
