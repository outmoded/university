// Load modules

var Code = require('code');
var Lab = require('lab');
var Hueniversity = require('../lib');
var Users = require('../lib/users.json');
var Basic = require('hapi-auth-basic');

// Declare internals

var internals = {};

// Test shortcuts

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;


describe('/private', function () {

    it('returns unauthorized if user doesn\'t exist', function (done) {

        Hueniversity.init(0, function (err, server) {

            expect(err).to.not.exist();

            var username = 'test';

            expect(Users[username]).to.be.undefined();

            var password = '12345678';
            var request = { method: 'GET', url: '/private', headers: { authorization: internals.header(username, password) } };

            server.inject(request, function (res) {

                expect(res.statusCode).to.equal(401);

                server.stop(done);
            });
        });
    });

    it('returns unauthorized if user exist but password is wrong', function (done) {

        Hueniversity.init(0, function (err, server) {

            expect(err).to.not.exist();

            var username = 'jdoe';

            expect(Users[username]).to.deep.equal({username: 'jdoe', password: 'qwerty'});

            var password = '12345678';
            var request = { method: 'GET', url: '/private', headers: { authorization: internals.header(username, password) } };

            server.inject(request, function (res) {

                expect(res.statusCode).to.equal(401);

                server.stop(done);
            });
        });
    });

    it('returns greetings if user exists and password is ok', function (done) {

        Hueniversity.init(0, function (err, server) {

            expect(err).to.not.exist();

            var username = 'jdoe';

            expect(Users[username]).to.deep.equal({username: 'jdoe', password: 'qwerty'});

            var password = 'qwerty';
            var request = { method: 'GET', url: '/private', headers: { authorization: internals.header(username, password) } };

            server.inject(request, function (res) {

                expect(res.statusCode).to.equal(200);
                expect(res.result).to.equal('<html><head><title>private page</title></head><body>Greetings jdoe. Welcome to the private section.</body></html>');

                server.stop(done);
            });
        });
    });

    it('error bubbles up if basic auth plugin registration throws', { parallel: false }, function (done) {

        var orig = Basic.register;
        Basic.register = function (server, options, next) {

            Basic.register = orig;
            return next(new Error('register basic auth failed'));
        };

        Basic.register.attributes = {
            name: 'fake basic auth'
        };

        Hueniversity.init(0, function (err, server) {

            expect(err).to.exist();
            expect(err.message).to.equal('register basic auth failed');

            done();
        });
    });
});

internals.header = function (username, password) {

    return 'Basic ' + (new Buffer(username + ':' + password, 'utf8')).toString('base64');
};
