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

    it('initializes the server', function (done) {

        Server.init(null, function(err, server) {

            expect(server.info.port).to.equal(8000);
            server.stop(done);
        });
    });
});
