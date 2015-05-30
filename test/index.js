// Load modules

var Hapi = require('hapi');
var Code = require('code');
var Lab = require('lab');
var University = require('../lib');
var Version = require('../lib/version');

// Declare internals

var internals = {};

// Test shortcuts

var lab = exports.lab = Lab.script();
var expect = Code.expect;
var it = lab.test;


it('starts server and returns hapi server object', function (done) {

    University.init({}, function (err, server) {

        expect(err).to.not.exist();
        expect(server).to.be.instanceof(Hapi.Server);

        server.stop(done);
    });
});

it('starts server on provided port', function (done) {

    var config = {
        connections: [
            {
                port: 5000
            }
        ]
    };

    University.init(config, function (err, server) {

        expect(err).to.not.exist();
        expect(server.info.port).to.equal(config.connections[0].port);

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

    University.init(internals.defaultServer, function (err, server) {

        expect(err).to.exist();
        expect(err.message).to.equal('register version failed');

        done();
    });
});


internals.defaultServer = {
    connections: [
        {
            port: 0
        }
    ]
};
