// Load modules

var Code = require('code');
var Lab = require('lab');
var Server = require('../lib');


// Test shortcuts

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;


// Declare internals

var internals = {};


describe('/private', function () {

    it('valid users', function (done) {

        Server.init(0, function (err, server) {

            expect(err).to.not.exist();

            var request = { url: '/private', headers: { authorization: internals.header('john', '12345') } };

            server.inject(request, function (res) {

                expect(res.statusCode).to.equal(200);
                expect(res.result).to.include('John Doe');

                server.stop(done);
            });
        });
    });

    it('in handles Invalid users by retrns ###', function (done) {

        Server.init(0, function (err, server) {

            expect(err).to.not.exist();

            var request = { url: '/private', headers: { authorization: internals.header('Dave', '12345') } };

            server.inject(request, function (res) {

                expect(res.statusCode).to.equal(401);
                expect(res.result).to.contain('error');

                server.stop(done);
            });
        });
    });

        it('tells the user that the password was invalid', function (done) {

        Server.init(0, function (err, server) {

            expect(err).to.not.exist();

            var request = { url: '/private', headers: { authorization: internals.header('john', '1') } };

            server.inject(request, function (res) {

                expect(res.statusCode).to.equal(401);
                expect(res.result).to.include('error');

                server.stop(done);
            });
        });
    });

});

internals.header = function (username, password) {

    return 'Basic ' + (new Buffer(username + ':' + password, 'utf8')).toString('base64');
};
