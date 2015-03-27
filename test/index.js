
var Code = require('code');   // assertion library
var Hoek = require('hoek');

var Lab = require('lab');
var lab = exports.lab = Lab.script();

var Server = require('../lib');


lab.test('init with specific port', function (done) {

    Server.init(5000, function(err, server) {

        Code.expect(!err, err);
        Code.expect(server).to.not.be.null();
        Code.expect(server.info.port).to.be.a.number().and.to.equal(5000);
        server.stop(done);
    });
});

lab.test('init without a port', function (done) {

    Server.init(function(err, server) {

        Code.expect(!err, err);
        Code.expect(server).to.not.be.null();
        Code.expect(server.info.port).to.be.a.number().and.to.equal(8000);
        server.stop(done);
    });
});
