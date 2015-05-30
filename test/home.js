// Load modules

var Code = require('code');
var Lab = require('lab');
var Path = require('path');
var University = require('../lib');


// Declare internals

var internals = {};


// Test shortcuts

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;


describe('/home', function () {

    it('returns the path of the view file', function (done) {

        University.init(internals.defaultServer, function (err, server) {

            expect(err).to.not.exist();

            server.inject('/home', function (res) {

                expect(res.statusCode).to.equal(200);
                expect(res.result).to.equal(Path.relative('./', 'views/home.html') + '\n');

                server.stop(done);
            });
        });
    });
});


internals.defaultServer = {
    connections: [
        {
            port: 0
        }
    ]
};
