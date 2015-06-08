// Load modules

var Code = require('code');
var Lab = require('lab');
var University = require('../lib');
var Path = require('path');
var Config = require('../lib/config');

// Declare internals

var internals = {};


// Test shortcuts

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;

describe('/home', function () {

    it('redirect on request for home page', function (done) {

        University.init(internals.manifest, internals.composeOptions, function (err, server) {

            expect(err).to.not.exist();

            var request = { method: 'GET', url: '/home' };
            server.inject(request, function (res) {

                expect(res.statusCode, 'Status code').to.equal(301);
                expect(res.headers.location).to.equal('https://localhost:8001/home');

                server.stop(done);
            });
        });
    });

    it('https returns home page containing', function (done) {

        University.init(internals.manifest, internals.composeOptions, function (err, server) {

            expect(err).to.not.exist();

            var tlserver = server.select('web-tls');

            var request = { method: 'GET', url: '/home' };
            tlserver.inject(request, function (res) {

                expect(res.statusCode, 'Status code').to.equal(200);

                server.stop(done);
            });
        });
    });

    it('redirect returns server index page ', function (done) {

        University.init(internals.manifest, internals.composeOptions, function (err, server) {

            expect(err).to.not.exist();

            var request = { method: 'GET', url: '/' };
            server.inject(request, function (res) {

                expect(res.statusCode, 'Status code').to.equal(301);
                expect(res.headers.location).to.equal('https://localhost:8001/');

                server.stop(done);
            });
        });
    });

    it('https index page redirects to /home', function (done) {

        University.init(internals.manifest, internals.composeOptions, function (err, server) {

            expect(err).to.not.exist();

            var tlserver = server.select('web-tls');

            var request = { method: 'GET', url: '/' };
            tlserver.inject(request, function (res) {

                // redirect to /home
                expect(res.statusCode, 'Status code').to.equal(301);
                expect(res.headers.location).to.equal('/home');

                server.stop(done);
            });
        });
    });
});

internals.manifest = {
    connections: [
    {
        host: 'localhost',
        port: 0,
        labels: ['web']
    },
    {
        host: 'localhost',
        port: 0,
        labels: ['web-tls'],
        tls: Config.tls
    }],
    plugins: {
        './home': [{
            'select': ['web', 'web-tls']
        }]
    }
};

internals.composeOptions = {
    relativeTo: Path.resolve(__dirname, '../lib')
};
