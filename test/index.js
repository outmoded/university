// Load modules

var Hapi = require('hapi');
var Code = require('code');
var Lab = require('lab');
var Hueniversity = require('../lib');
var Version = require('../lib/version');


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

describe('/index', function () {

    it('starts server and returns hapi server object', function (done) {

        Hueniversity.init(internals.defaultManifest, function (err, server) {

            expect(err).to.not.exist();
            expect(server).to.be.instanceof(Hapi.Server);

            server.stop(done);
        });
    });

    it('starts server on provided port', function (done) {

        var config = {
            connections: [
                { port: 5000 }
            ]
        };

        Hueniversity.init(config, function (err, server) {

            expect(err).to.not.exist();
            expect(server.info.port).to.equal(5000);

            server.stop(done);
        });
    });

    it('handles register plugin errors', { parallel: false }, function (done) {

        var orig = Version.register;
        Version.register = function (server, options, next) {

            Version.register = orig;
            return next(new Error('register version failed'));
        };

        Version.register.attributes = {
            name: 'fake version'
        };

        Hueniversity.init(internals.defaultManifest, function (err, server) {

            expect(err).to.exist();
            expect(err.message).to.equal('register version failed');

            done();
        });
    });
});
