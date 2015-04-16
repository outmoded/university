var Code = require('code');
var Lab = require('lab');
var Server = require('../lib/index');
var Version = require('../lib/version');

// Set testing nicknames (shortcuts) for readablility

var lab = exports.lab = Lab.script();
var expect = Code.expect;
var describe = lab.experiment;
var it = lab.test;

var port = 8000; // Define server port

describe('Should create a server with default port', function() {


    it('Starts server with default port', function(done) {

        Server.init(port, function(err, server) {
            expect(server.info.port).to.equal(port);
            server.stop(done);
        });
    });

    it('Version plugin fails to load due to error', function(done) {
        // Assign the real Version plugin to a variable so we
        // can fix things after testing

        var register = Version.register;

        // Set the Version plugin to some dummy data

        Version.register = function(server, options, next) {

            return next('Fake register function');
        };

        Version.register.attributes = {
            name: 'Fake name'
        };

        Server.init(port, function(err, server) {

            expect(err).to.equal('Fake register function');
            expect(server.info.port).to.equal(8000);
            Version.register = register;
            server.stop(done);
        });
    });
});
