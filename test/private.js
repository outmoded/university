// Load modules

var Code = require('code');
var Lab = require('lab');
var Server = require('../lib');


// Test shortcuts

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;

var internals = {};

describe('/private', function () {

    it('private allows you to auth', function (done) {

        Server.init(0, function (err, server) {

            expect(err).to.not.exist();

            var request = {
                method: 'GET',
                url: '/private',
                headers: {
                    authorization: internals.header('starkiller', 'cold-hand-luke')
                }
            };

            server.inject(request, function (res) {

                expect(res.statusCode).to.equal(200);
                expect(res.result).to.equal('<html><body><p>Hello starkiller</p></body></html>');

                server.stop(done);
            });
        });
    });
});


internals.header = function (username, password) {

    return 'Basic ' + (new Buffer(username + ':' + password, 'utf8')).toString('base64');
};
