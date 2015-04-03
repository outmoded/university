// Load modules

var Lab = require('lab');
var Code = require('code');
var Server = require('../lib');
var Pkg = require('../package.json');


// Declare internals

var internals = {};


// Test shortcuts

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var it = lab.test;
var expect = Code.expect;


describe('Version.register()', function () {

    it('returns the server version', function (done) {

        Server.init(function (err, server) {

            server.inject('/version', function (response) {

                expect(response.statusCode).to.equal(200);
                expect(response.result).to.deep.equal({ version: Pkg.version });
                server.stop(done);
            });
        });
    });
});
