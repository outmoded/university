// Load modules

var Hapi = require('hapi');
var Code = require('code');
var Lab = require('lab');
var University = require('../lib');
var Version = require('../lib/version');
var Path = require('path');
var Config = require('../lib/config');

//declare internals

var internals = {};

// Test shortcuts

var lab = exports.lab = Lab.script();
var expect = Code.expect;
var describe = lab.experiment;
var it = lab.test;


describe('/index', function () {

    it('starts server and returns hapi server object', function (done) {

        University.init(internals.manifest, internals.composeOptions, function (err, server) {

            expect(err).to.not.exist();
            // expect(server).to.be.instanceof(Hapi.Server);
            expect(server.version).to.equal('8.6.1');
            server.stop(done);
        });
    });

    it('starts server on provided port', function (done) {

        internals.manifest.connections[0].port = 5000;

        University.init(internals.manifest, internals.composeOptions, function (err, server) {

            expect(err).to.not.exist();
            expect(server.info.port).to.equal(5000);
            internals.manifest.connections[0].port = 0;
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

        University.init(internals.manifest, internals.composeOptions, function (err, server) {

            expect(err).to.exist();
            expect(err.message).to.equal('register version failed');

            done();
        });
    });
});

internals.manifest = {
    connections: [
    {
        host: 'localhost',
        port: 0,
        labels: ['web']
    },
    {
        host: 'localhost',
        port: 0,
        labels: ['web-tls'],
        tls: Config.tls
    }],
    plugins: {
        './version': [{
            'select': ['web', 'web-tls']
        }]
    }
};

internals.composeOptions = {
    relativeTo: Path.resolve(__dirname, '../lib')
};
