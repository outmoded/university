// Load modules

var Code = require('code');
var Lab = require('lab');
var University = require('../lib');
var Path = require('path');
var Manifest = require('../lib/manifest.json');


// Declare internals

var internals = {};


// Test shortcuts

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;


describe('/home', function () {

    it('returns the version from package.json', function (done) {

        University.init(Manifest, internals.options, function (err, server) {

            expect(err).to.not.exist();

            server.inject('/home', function (res) {

                expect(res.statusCode).to.equal(200);
                expect(res.result).to.equal(Path.relative('./', 'views/home.html'));

                server.stop(done);
            });
        });
    });
});


internals.options = {
    relativeTo: __dirname + '../../lib'
};
