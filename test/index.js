// Load modules

var Lab = require('Lab');
var Code = require('Code');
var Server = require('../lib');


// Declare internals

var internals = {};


// Test shortcuts

var lab = exports.lab = Lab.script();
var expect = Code.expect;
var describe = lab.experiment;
var it = lab.test;


describe('Server.init()', function () {

    it('starts the server with port 8000 if no port is given', function (done) {

        Server.init(function (err, server) {

            expect(err).to.equal(undefined);
            expect(server.info.port).to.equal(8000);
            server.stop(done);
        });
    });

    it('starts the server with the given port', function (done) {

        Server.init(3000, function (err, server) {

            expect(err).to.equal(undefined);
            expect(server.info.port).to.equal(3000);
            server.stop(done);
        });
    });
});
