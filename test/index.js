var Code = require('code');
var Lab = require('lab');
var Server = require('../lib/index');
var Version = require('../lib/version');

var lab = exports.lab = Lab.script();
var expect = Code.expect;
var describe = lab.experiment;
var it = lab.test;


describe('Should create a server with default port', function() {

    it('starts the server', function(done) {

        Server.init(8000, function(err, server) {

            expect(err).to.be.undefined();
            expect(server.info.port).to.equal(8000);
            server.stop(done); // done is getting passed as a callback?
        });
    });

    it('Starts server with default port', function(done) {
        Server.init(function(err, server) {
            expect(server.info.port).to.equal(8000);
            server.stop(done);
        });
    });

    // This test below was made possible because @zoe-1 & @TheAlphaNerd lead the way

    it('Version plugin fails to load due to error', function(done) {
        // Assign the real Version plugin to a variable so we
        // can fix things after testing

        var register = Version.register;

        // Set the Version plugin to some dummy data

        Version.register = function(server, options, next) {

            next('Fake register function');
        };

        Version.register.attributes = {
            name: 'Fake name'
        };

        Server.init(function(err, server) {

            expect(err).to.equal('Fake register function');
            expect(server.info.port).to.equal(8000);
            Version.register = register;
            server.stop(done);
        });
    });
});
