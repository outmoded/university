// Load modules

var Code = require('code');
var Lab = require('lab');
var Hueniversity = require('../lib');
var Users = require('../lib/users.json');
var Basic = require('hapi-auth-basic');
var Hoek = require('hoek');

// Declare internals

var internals = {};

// Test shortcuts

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;
var beforeEach = lab.beforeEach;
var afterEach = lab.afterEach;


describe('/private', function () {

    beforeEach(function(done){

        internals.injectTestUsersByPatchingUsersModule();
        done();
    });

    afterEach(function(done){

        internals.restoreOrigUsersCollectionInUsersModule();
        done();
    });

    it('returns unauthorized if user doesn\'t exist', { parallel: false }, function (done) {

        Hueniversity.init(0, function (err, server) {

            expect(err).to.not.exist();

            var username = 'test';

            var password = '12345678';
            var request = { method: 'GET', url: '/private', headers: { authorization: internals.header(username, password) } };

            server.inject(request, function (res) {

                expect(res.statusCode).to.equal(401);

                server.stop(done);
            });
        });
    });

    it('returns unauthorized if user exist but password is wrong', { parallel: false }, function (done) {

        Hueniversity.init(0, function (err, server) {

            expect(err).to.not.exist();

            var username = 'jdoe';
            var password = '12345678';
            var request = { method: 'GET', url: '/private', headers: { authorization: internals.header(username, password) } };

            server.inject(request, function (res) {

                expect(res.statusCode).to.equal(401);

                server.stop(done);
            });
        });
    });

    it('returns greetings if user exists and password is ok', { parallel: false }, function (done) {

        Hueniversity.init(0, function (err, server) {

            expect(err).to.not.exist();

            var username = 'jdoe';
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

internals.testUsers = [{username: 'jdoe', password: 'qwerty'}];

internals.injectTestUsersByPatchingUsersModule = function(){

    internals.origUsersCollection = Users.collection;
    Users.collection = Hoek.clone(internals.testUsers);
};

internals.restoreOrigUsersCollectionInUsersModule = function(){

    Users.collection = internals.origUsersCollection;
};
