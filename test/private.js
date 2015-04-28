// Load modules

var Basic = require('hapi-auth-basic');
var Code = require('code');
var Lab = require('lab');
var Hueniversity = require('../lib');


// Declare internals

var internals = {};


// Test shortcuts

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;


describe('/private', function () {

    it('returns welcome message with the authenticated username', function (done) {

        Hueniversity.init(0, function (err, server) {

            expect(err).to.not.exist();

            var request = {
                url: '/private',
                headers: {
                    authorization: internals.header('user1', 'secret1')
                }
            };
            server.inject(request, function (res) {

                expect(res.statusCode).to.equal(200);
                expect(res.result).to.equal('<p>Welcome user1 we are hapi to see you back</p>');

                server.stop(done);
            });
        });
    });

    it('returns unauthorized when the user not exists', function (done) {

        Hueniversity.init(0, function (err, server) {

            expect(err).to.not.exist();

            var request = {
                url: '/private',
                headers: {
                    authorization: internals.header('notexistsuser', 'secret1')
                }
            };
            server.inject(request, function (res) {

                expect(res.statusCode).to.equal(401);

                server.stop(done);
            });
        });
    });

    it('returns unauthorized when the password is wrong', function (done) {

        Hueniversity.init(0, function (err, server) {

            expect(err).to.not.exist();

            var request = {
                url: '/private',
                headers: {
                    authorization: internals.header('user1', 'wrong password')
                }
            };
            server.inject(request, function (res) {

                expect(res.statusCode).to.equal(401);

                server.stop(done);
            });
        });
    });

    it('handles register hapi-auth-basic errors', { parallel: false }, function (done) {

        var orig = Basic.register;
        Basic.register = function (server, options, next) {

            Basic.register = orig;
            return next(new Error('register hapi-auth-basic failed'));
        };

        Basic.register.attributes = {
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
