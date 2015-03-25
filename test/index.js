// Load modules

var Code = require('code');
var Lab = require('lab');
var Server = require('../lib');

// Declare internals

var internals = {};

// Test shortcuts

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var it = lab.test;
var expect = Code.expect;

describe('index', function () {

    it('should create a server with defautl port', function (done) {

        Server.init(function(err, server) {

            expect(server.info.port).to.equal(8000);
            server.stop(done);
        });
    });

    it('should create a server with specific port', function (done) {

        Server.init(3000, function(err, server) {

            expect(server.info.port).to.equal(3000);
            server.stop(done);
        });
    });
});
