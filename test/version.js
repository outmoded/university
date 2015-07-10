var Code = require('code');
var Lab = require('lab');
var Pkg = require('../package.json');
var Server = require('../lib/index');
var lab = exports.lab = Lab.script();

lab.experiment('/version', function () {

    lab.test('/return package.json version', function (done){

        Server.init(0, function (err, server){

            Code.expect(err).to.not.exist();

            server.inject('/version', function (res) {

                Code.expect(res.statusCode).to.equal(200);
                Code.expect(res.result).to.deep.equal({ version: Pkg.version });

                server.stop(done);
            });
        });
    });
});


