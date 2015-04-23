// Load modules

var Hapi = require('hapi');
var Code = require('code');
var Lab = require('lab');
var Hueniversity = require('../lib');
var Version = require('../lib/version');
var Users = require('../lib/users.json');


// Test shortcuts

var lab = exports.lab = Lab.script();
var expect = Code.expect;
var it = lab.test;

it('throws if configuration is null', function(done){

    Hueniversity.init(null, function (err, server) {

        expect(err).to.exist();
        expect(err.message).to.equal('mandatory configuration object not provided');

        done();
    });
});

it('starts server and returns hapi server object', function (done) {

    Hueniversity.init({port: 0, users: Users}, function (err, server) {

        expect(err).to.not.exist();
        expect(server).to.be.instanceof(Hapi.Server);

        server.stop(done);
    });
});

it('starts server on provided port', function (done) {

    Hueniversity.init({port: 5000, users: Users}, function (err, server) {

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

    Hueniversity.init({port: 0, users: Users}, function (err, server) {

        expect(err).to.exist();
        expect(err.message).to.equal('register version failed');

        done();
    });
});
