var Code = require('code');
var Lab = require('lab');
var Server = require('../lib');
var Version = require('../lib/version');


var internals = {
    port: 3000
};


var lab = exports.lab = Lab.script();
var expect = Code.expect;
var describe = lab.describe;
var it = lab.it;

describe('Server', function () {

    it('test starting server on port ' + internals.port, function (done) {

        Server(internals.port, function(err, server) {

            expect(!err).to.equal(true);
            expect(server.info.port).to.equal(internals.port);

            server.stop(done);
        });
    });

    it('test plugin error', function (done) {

        var register = Version.register;
        Version.register = function (server, options, next) {

            return next('Error');
        };
        Version.register.attributes = {
            name: 'Error test'
        };
        Server(internals.port, function(err, server) {

            expect(err).to.equal('Error');

            Version.register = register;
            server.stop(done);
        });
    });


});
