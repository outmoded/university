var Lab = require('lab');
var Code = require('code');
var Server = require('../lib');


var lab = exports.lab = Lab.script();

lab.experiment('Server', function () {

    lab.test('server start with a valid port', function (done) {

        Server.init(5000, function (err, server) {

            Code.expect(err).to.not.exist();
            Code.expect(server).to.be.an.object();
            Code.expect(server.info.port).to.equal(5000);
            server.stop(done);
        });
    });

    lab.test('server starts with defaults', function (done) {

        Server.init(function (err, server) {

            Code.expect(err).to.not.exist();
            Code.expect(server).to.be.an.object();
            Code.expect(server.info.port).to.equal(8000);
            server.stop(done);
        });
    });

    lab.test('server handles plugin errors', function (done) {

        var Version = require('../lib/version');
        var register = Version.register;

        Version.register = function (server, options, next) {
            return next(new Error('Plugin error!'));
        };

        Version.register.attributes = {
            name: 'fake-plugin'
        };

        Server.init(function (err, server) {

            Code.expect(err).to.exist();
            Code.expect(server).to.be.undefined();
            Code.expect(err.message).to.equal('Plugin error!');
            Version.register = register;
            done();
        });
    });
});
