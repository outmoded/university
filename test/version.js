
var Code = require('code');
var Lab = require('lab');
var Server = require('../lib');
var Pkg = require('../package.json');


// Test shortcuts 

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var it = lab.test;
var expect = Code.expect;


describe('Version', function() {

    it('Return correct version data', function(done){

        Server.init(null,function(err, server){

            expect(server.info.port).to.equal(8000);
            expect(err).to.be.undefined();

            server.inject('/version', function (response) {

                expect(response.statusCode).to.equal(200);
                expect(response.result.version).to.equal(Pkg.version);
            });

            server.stop();
        });

        done();
    });
});
