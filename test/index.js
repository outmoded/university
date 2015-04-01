var Code = require('code');
var Lab = require('lab');
var Server = require('../lib/index');
//var Version = require('../lib/version');

var lab = exports.lab = Lab.script();
var expect = Code.expect;
var describe = lab.experiment;
var it = lab.test;


describe('Should create a server with default port', function() {

    it('starts the server', function(done) {

        Server.init(8000, function(err, server) {
            //
            //console.log(server.info);
            //expect(err).to.be.undefined();
            expect(server.info.port).to.equal(8000);
            server.stop(done); // done is getting passed as a callback?
        });
    });
});
