// Load modules

var Hapi = require('hapi');
var Code = require('code');
var Lab = require('lab');
var Hueniversity = require('../lib');
var Users = require('../lib/users.json');
var Basic = require('hapi-auth-basic');


// Test shortcuts

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;


// Declare Internals

var internals = {};


describe('/private end point authentication', function () {

    it('returns a greeting to authenticated user', function (done) {

        Hueniversity.init(0, function (err, server) {

            expect(err).to.not.exist();

            var request = { method: 'GET', url: '/private', headers: { authorization: internals.header(Users.john.username, Users.john.password) } };
            server.inject(request, function (res) {

                expect(res.statusCode, 'Status code').to.equal(200);
                expect(res.result, 'result').to.equal('<div>Hello john</div>');

                server.stop(done);
            });
        });
    });


    it('Auth attempt failed bad username', function (done) {

        Hueniversity.init(0, function (err, server) {

            expect(err).to.not.exist();

            var request = { method: 'GET', url: '/private', headers: { authorization: internals.header('Bad name', Users.john.password) } };
            server.inject(request, function (res) {

                expect(res.statusCode, 'Status code').to.equal(401);
                server.stop(done);
            });
        });
    });


    it('Auth attempt failed bad pw', function (done) {

        Hueniversity.init(0, function (err, server) {

            expect(err).to.not.exist();

            var request = { method: 'GET', url: '/private', headers: { authorization: internals.header(Users.john.username, 'badpw') } };
            server.inject(request, function (res) {

                expect(res.statusCode, 'Status code').to.equal(401);
                server.stop(done);
            });
        });
    });


    it('Auth attempt failed bad username and pw.', function (done) {

        Hueniversity.init(0, function (err, server) {

            expect(err).to.not.exist();

            var request = { method: 'GET', url: '/private', headers: { authorization: internals.header('bad-username', 'bad-pw') } };
            server.inject(request, function (res) {

                expect(res.statusCode, 'Status code').to.equal(401);
                server.stop(done);
            });
        });
    });

    it('hapi-auth-basic plugin failed to load', { parallel: false }, function (done) {

        var orig = Basic.register;
        Basic.register = function (server, options, next) {

            Basic.register = orig;
            return next(new Error('require hapi-auth-basic failed'));
        };

        Basic.register.attributes = {
            name: 'fake private'
        };

        Hueniversity.init(0, function (err, server) {

            expect(err).to.exist();
            expect(err.message).to.equal('require hapi-auth-basic failed');
            done();
        });
    });
});


internals.header = function (username, password) {

    return 'Basic ' + (new Buffer(username + ':' + password, 'utf8')).toString('base64');
};
