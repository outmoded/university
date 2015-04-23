// Load modules

var Hapi = require('hapi');
var Code = require('code');
var Lab = require('lab');
var Private = require('../lib/private');
var HapiAuthBasic = require('hapi-auth-basic');
var Hueniversity = require('../lib');


// Test shortcuts

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;

// Declare internals

var internals = {};


describe('/private', function () {

    it('welcomes a user on successful auth', function (done) {

        Hueniversity.init(0, function (err, server) {

            expect(err).to.not.exist();

            var request = { url: '/private', headers: { authorization: internals.header('test1', 'testpassword1') } };

            server.inject(request, function (res) {

                expect(res.statusCode).to.equal(200);
                expect(res.result).to.contain('test1');

                server.stop(done);
            });
        });
    });

    it('return an error on bad password', function (done) {

        Hueniversity.init(0, function (err, server) {

            expect(err).to.not.exist();

            var request = { url: '/private', headers: { authorization: internals.header('test1', 'wrongPassword') } };

            server.inject(request, function (res) {

                expect(res.statusCode).to.equal(401);
                expect(res.result).to.deep.equal(internals.badUsernameOrPassword);

                server.stop(done);
            });
        });
    });

    it('return an error on unknown user', function (done) {

        Hueniversity.init(0, function (err, server) {

            expect(err).to.not.exist();

            var request = { url: '/private', headers: { authorization: internals.header('unknownUser', '') } };

            server.inject(request, function (res) {

                expect(res.statusCode).to.equal(401);
                expect(res.result).to.deep.equal(internals.badUsernameOrPassword);

                server.stop(done);
            });
        });
    });

    it('handles register hapi-auth-basic plugin errors', { parallel: false }, function (done) {

        var orig = HapiAuthBasic.register;
        HapiAuthBasic.register = function (server, options, next) {

            HapiAuthBasic.register = orig;
            return next(new Error('register hapi-auth-basic failed'));
        };

        HapiAuthBasic.register.attributes = {
            name: 'fake hapi-auth-basic'
        };

        Hueniversity.init(0, function (err, server) {

            expect(err).to.exist();
            expect(err.message).to.equal('register hapi-auth-basic failed');

            done();
        });
    });
});


internals.header = function (username, password) {

    return 'Basic ' + (new Buffer(username + ':' + password, 'utf8')).toString('base64');
};

internals.badUsernameOrPassword = {
    statusCode: 401,
    error: 'Unauthorized',
    message: 'Bad username or password'
};
