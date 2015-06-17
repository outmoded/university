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

    it('ensures that /home is always redirected to https', function (done) {

        University.init(internals.manifest, internals.composeOptions, function (err, server) {

            expect(err).to.not.exist();

            var request = { method: 'GET', url: '/home' };
            server.select('web').inject(request, function (res) {

                expect(res.statusCode, 'Status code').to.equal(301);
                expect(res.headers.location).to.equal('https://localhost:8001/home');

                server.stop(done);
            });
        });
    });

    it('returns an home page via https', function (done) {

        University.init(internals.manifest, internals.composeOptions, function (err, server) {

            expect(err).to.not.exist();

            // #### Debugging https testing conclusion is must use nock  #### //
            // var request = { method: 'GET', url: '/home', headers: { Host: 'https', location: 'https://localhost:8001/home' } };
            // @arb's recommendations
            // i've used nock() before
            // as you can probably guess by the issues i opened up
            // it's good
            // another thing you could do would be to stand up a dummy server that responds with JSON fixtures
            // also you can look at request.url that should tell you if the request is https or not
            var request = { method: 'GET', url: '/home', headers: { location: 'https://localhost:8001/home' } };
            server.select('web-tls').inject(request, function (res) {

                expect(res.statusCode, 'Status code').to.equal(200);

                expect(res.raw.req.headers.location).to.equal('https://localhost:8001/home');

                //expect(res.raw.req.result).to.equal('result');

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
        }
    ],
    plugins: {
        './home': {}
    }
};

internals.composeOptions = {
    relativeTo: Path.resolve(__dirname, '../lib')
};
