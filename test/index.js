// Load modules

var Hapi = require('hapi');
var Code = require('code');
var Lab = require('lab');
var Hueniversity = require('../lib');
var Version = require('../lib/version');
var Private = require('../lib/private');


// Test shortcuts

var lab = exports.lab = Lab.script();
var expect = Code.expect;
var it = lab.test;


it('starts server and returns hapi server object', function (done) {

    Hueniversity.init(0, function (err, server) {

        expect(err).to.not.exist();
        expect(server).to.be.instanceof(Hapi.Server);

        server.stop(done);
    });
});

it('starts server on provided port', function (done) {

    Hueniversity.init(5000, function (err, server) {

        expect(err).to.not.exist();
        expect(server.info.port).to.equal(5000);

        server.stop(done);
    });
});

it('handles register version plugin errors', { parallel: false }, function (done) {

    var orig = Version.register;
    Version.register = function (server, options, next) {

        Version.register = orig;
        return next(new Error('register version failed'));
    };

    Version.register.attributes = {
        name: 'fake version'
    };

    Hueniversity.init(0, function (err, server) {

        expect(err).to.exist();
        expect(err.message).to.equal('register version failed');

        done();
    });
});

it('handles register private plugin errors', { parallel: false }, function (done) {

    var orig = Private.register;
    Private.register = function (server, options, next) {

        Private.register = orig;
        return next(new Error('register private failed'));
    };

    Private.register.attributes = {
        name: 'fake private'
    };

    Hueniversity.init(0, function (err, server) {

        expect(err).to.exist();
        expect(err.message).to.equal('register private failed');

        done();
    });
});
