// Load modules

var Code = require('code');
var Lab = require('lab');
var University = require('../lib');
var Path = require('path');

// Declare internals

var internals = {};


// Test shortcuts

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;

describe('/home', function () {

    it('returns home page containing relative path from root to home template', function (done) {

        University.init(internals.manifest, internals.composeOptions, function (err, server) {

            expect(err).to.not.exist();

            var request = { method: 'GET', url: '/home' };
            server.inject(request, function (res) {

                expect(res.statusCode, 'Status code').to.equal(200);
                expect(res.result, 'result').to.contains('img');

                server.stop(done);
            });
        });
    });
});

describe('/login', function () {

    it('returns login  page containing username', function (done) {

        University.init(internals.manifest, internals.composeOptions, function (err, server) {

            expect(err).to.not.exist();

            var request = { method: 'GET', url: '/login'};
            server.inject(request, function (res) {

                expect(res.statusCode, 'Status code').to.equal(200);
                expect(res.result, 'result').to.contains('username');

                server.stop(done);
            });
        });
    });
});

it('GET request should respond properly.', function (done){

    University.init(internals.manifest, internals.composeOptions, function (err, server) {

        expect(err).to.not.exist();

        // IMPORTANT   this is how to inject into tis connection avoiding the redirect.
        var tlserver = server.select('web-tls');

        tlserver.inject({url: '/home', method: 'GET' }, function (response) {

            expect(response.statusCode).to.equal(200);
            server.stop(done);
        });
    });
});

internals.manifest = {
    connections: [
        {
            host: 'localhost',
            port: 8001,
            labels: ['web-tls']
        }
    ],
    plugins: {
        './home': {}
    }
};

internals.composeOptions = {
    relativeTo: Path.resolve(__dirname, '../lib')
};
