// Load modules

var Basic = require('hapi-auth-basic');
var Code = require('code');
var Lab = require('lab');
var Hueniversity = require('../lib');

// Declare internals

var internals = {};

internals.header = function (username, password) {

    return 'Basic ' + (new Buffer(username + ':' + password, 'utf8')).toString('base64');
};

// Test shortcuts

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;


describe('/private', function () {

    it('test registration of basic auth', { parallel: false }, function (done) {

        var orig = Basic.register;
        Basic.register = function (server, options, next) {

            Basic.register = orig;
            return next(new Error('Registration failed'));
        };

        Basic.register.attributes = {
            name: 'foo hapi-auth'
        };

        Hueniversity.init(0, function (err, server) {

            expect(err).to.exist();
            expect(err.message).to.equal('Registration failed');

            done();
        });
    });

    it('returns the welcome message with authenticated username', function (done) {

        Hueniversity.init(0, function (err, server) {

            expect(err).to.not.exist();

            var request = {
                url: '/private',
                headers: {
                    authorization: internals.header('one', 'anotherpass' )
                }
            };

            server.inject(request, function (res) {

                expect(res.statusCode).to.equal(200);
                expect(res.result).to.equal('<h2>Welcome one</h2>');

                server.stop(done);
            });
        });
    });

    it('return unathorized for failure authentication', function (done) {

        Hueniversity.init(0, function (err, server) {

            expect(err).to.not.exist();

            var request = {
                url: '/private',
                headers: {
                    authorization: internals.header('foo', 'foopass' )
                }
            };
            server.inject(request, function (res) {

                expect(res.statusCode).to.equal(401);

                server.stop(done);
            });
        });
    });
});
