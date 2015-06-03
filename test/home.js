// Load modules

var Code = require('code');
var Lab = require('lab');
var Hueniversity = require('../lib');
var Path = require('path');


// Test shortcuts

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;

// Declaring internals

var internals = {};
internals.defaultManifest = {
    connections: [
        { port: 0 }
    ]
};
internals.home = {
    path: Path.relative('../', Path.resolve('../views', 'home.html'))
};

describe('/home', function () {

    it('Displays a home page with the path to home.html', function (done) {

        Hueniversity.init(internals.defaultManifest, function (err, server) {

            expect(err).to.not.exist();

            server.inject('/home', function (res) {

                expect(res.statusCode).to.equal(200);
                expect(res.result).to.contain(internals.home.path);

                server.stop(done);
            });
        });
    });
});
