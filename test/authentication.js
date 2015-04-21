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

it('returns a greeting for the authenticated user', function (done) {

    Hueniversity.init(0, function (err, server) {

        expect(err).to.not.exist();

        var request = { method: 'GET', url: '/private', headers: { authorization: internals.header(Users.user1.username, Users.user1.password) } };
        server.inject(request, function (res) {

            expect(res.statusCode, 'Status code').to.equal(200);
            expect(res.result, 'result').to.equal('<div>Hello user1</div>');

            server.stop(done);
            });
        });
});

it('returns a error message  for the authenticated user with a wrong password', function (done) {

    Hueniversity.init(0, function (err, server) {

        expect(err).to.not.exist();

        var request = { method: 'GET', url: '/private', headers: { authorization: internals.header(Users.user1.username, 'wrong password') } };
        server.inject(request, function (res) {

            expect(res.statusCode, 'Status code').to.equal(401);

            server.stop(done);
            });
        });
});

it('returns a error message  for the authenticated user with a wrong password', function (done) {

    Hueniversity.init(0, function (err, server) {

        expect(err).to.not.exist();

        var request = { method: 'GET', url: '/private', headers: { authorization: internals.header('wrong_name', '') } };
        server.inject(request, function (res) {

            expect(res.statusCode, 'Status code').to.equal(401);

            server.stop(done);
            });
        });
});

it('returns error on failed registering of auth', { parallel: false }, function (done) {

        var orig = Basic.register;
        Basic.register = function (plugin, options, next) {

            return next(new Error('fail'));
        };
        Basic.register.attributes = {
            name: 'fake hapi-auth-basic'
        };

        Hueniversity.init(0, function (err) {

            Basic.register = orig;

            expect(err).to.exist();

            done();
        });
});

internals.header = function (username, password) {

    return 'Basic ' + (new Buffer(username + ':' + password, 'utf8')).toString('base64');
};
