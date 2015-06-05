// Load modules

var Code = require('code');
var Lab = require('lab');
var Path = require('path');
var University = require('../lib');
var Config = require('../config/config.js');

// Declare internals

var internals = {};


// Test shortcuts

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;

describe('/home', function () {

    it('should redirct http to https', function (done) {

        University.init(internals.manifest, internals.composeOptions, function (err, server) {

            expect(err).to.not.exist();

            var request = {method: 'GET', url: '/home'};
            server.inject(request, function (res) {

                expect(res.statusCode, 'Status code').to.equal(301);
                expect(res.headers.location).to.equal('https://localhost:8001/home');

                server.stop(done);
            });
        });
    });

    it('returns home page containing relative path from root to home template', function (done) {

        University.init(internals.manifest, internals.composeOptions, function (err, server) {

            expect(err).to.not.exist();

            var tlsServer = server.select('web-tls');

            var request = { method: 'GET', url: '/home' };
            tlsServer.inject(request, function (res) {

                expect(res.statusCode, 'Status code').to.equal(200);
                expect(res.result, 'result').to.equal(Path.relative(Path.resolve('__dirname', '../'), Path.resolve('__dirname', '../views/home.html')));

                server.stop(done);
            });
        });
    });
});

internals.manifest = {
    connections: [
        {
            port: 0,
            labels: ['web']
        },
        {
            host: 'localhost',
            port: 0,
            labels: ['web-tls'],
            tls: Config.tls
        }
    ],
    plugins: {
        './home': [{
            'select': ['web', 'web-tls']
        }]
    }
};

internals.composeOptions = {
    relativeTo: Path.resolve(__dirname, '../lib')
};
