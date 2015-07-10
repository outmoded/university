var Code = require('code');
var Lab = require('lab');
var Pkg = require('../package.json');
var Server = require('../lib/index');
var Version = require('../lib/version');
var lab = exports.lab = Lab.script();

lab.experiment('/index', function () {

    lab.test('/success', function (done){

        Server.init(5000, function (err, server){

            Code.expect(err).to.not.exist();
            Code.expect(server.info.port).to.be.equal(5000);

            server.stop(done);
        });
    });

    lab.test('/error starting', function (done){

        var backup = Version.register;
        Version.register = function (server, options, next){
            Version.register = backup;

            return next(new Error('plugin failed to register'));
        };

        Version.register.attributes = {
            name: 'fake version'
        };

        Server.init(5000, function (err, server){

            Code.expect(err).to.exist();
            Code.expect(err.message).to.be.equal('plugin failed to register');

            done(); // server never started
        });
    });
});
