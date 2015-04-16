var Code = require('code');
var Lab = require('lab');

var index = require('../lib/index');


// Test shortcuts

var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var expect = Code.expect;


describe('index.js', function () {

    describe('init()', function () {

        it('Returns a server', function (done) {

            return index.init(null, function (err, server) {

                expect(err, 'error').to.not.exist();
                expect(server, 'server').to.be.an.object();

                server.stop(done);
            });
        });

        it('Returns an error when a plugin fails to register', { parallel: false }, function (done) {

            // Replace the register function to force an error that can be caught by init()
            // Make sure to backup the old register function and set it back!
            var Version = require('../lib/version');

            var backupRegister = Version.register;

            Version.register = function (server, options, next) {

                return next(new Error('Error'));
            };

            Version.register.attributes = {
                name: 'Error test'
            };

            return index.init(null, function(err, server) {

                expect(err, 'error').to.be.an.instanceOf(Error);
                expect(err.message, 'error message').to.equal('Error');
                expect(server, 'server').to.not.exist();

                Version.register = backupRegister;

                done();
            });
        });

        it('Returns a server with a connection on given port', function (done) {

            var port = 6000;

            return index.init(port, function (err, server) {

                expect(err, 'error').to.not.exist();
                expect(server.info.port, 'port').to.equal(port);

                server.stop(done);
            });
        });
    });
});
