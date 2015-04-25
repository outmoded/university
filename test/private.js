// Load modules

var Code = require('code');
var Lab = require('lab');
var Hueniversity = require('../lib');
var HapiAuthBasic = require('hapi-auth-basic');
var Users = require('../lib/users.json');

// Declare internals

var internals = {};

// Test shortcuts

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;


describe('/private', function () {

    it('should ask for authentication', function (done) {

        Hueniversity.init(0, function (err, server) {

            expect(err).to.not.exist();

            server.inject('/private', function (res) {

                expect(res.statusCode).to.equal(401);
                server.stop(done);
            });
        });
    });

    it('should should work with valid credentials', function (done) {

        Hueniversity.init(0, function (err, server) {

            expect(err).to.not.exist();

            var request = { method: 'GET', url: '/private', headers: { authorization: internals.header(Users.username1.username, Users.username1.password) } };

            server.inject(request, function (res) {

                expect(res.statusCode).to.equal(200);
                expect(res.result).to.equal('<p>Welcome ' + Users.username1.username + '</p>');
                server.stop(done);
            });
        });
    });

    it('should should fail with in-valid password', function (done) {

        Hueniversity.init(0, function (err, server) {

            expect(err).to.not.exist();

            var request = { method: 'GET', url: '/private', headers: { authorization: internals.header(Users.username1.username, 'wrongpass') } };

            server.inject(request, function (res) {

                expect(res.statusCode).to.equal(401);
                server.stop(done);
            });
        });
    });

    it('should should fail with in-valid username', function (done) {

        Hueniversity.init(0, function (err, server) {

            expect(err).to.not.exist();

            var request = { method: 'GET', url: '/private', headers: { authorization: internals.header('wrongusernae', 'wrongpass') } };

            server.inject(request, function (res) {

                expect(res.statusCode).to.equal(401);
                server.stop(done);
            });
        });
    });

    it('handles register plugin errors', { parallel: false }, function (done) {

        var orig = HapiAuthBasic.register;
        HapiAuthBasic.register = function (server, options, next) {

            HapiAuthBasic.register = orig;
            return next(new Error('register version failed'));
        };

        HapiAuthBasic.register.attributes = {
            name: 'fake version'
        };

        Hueniversity.init(0, function (err, server) {

            expect(err).to.exist();
            expect(err.message).to.equal('register version failed');

            done();
        });
    });
});

internals.header = function (username, password) {

    return 'Basic ' + (new Buffer(username + ':' + password, 'utf8')).toString('base64');
};
