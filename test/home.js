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

            var request = { method: 'GET', url: '/home' };
            server.select('web-tls').inject(request, function (res) {

                expect(res.statusCode, 'Status code').to.equal(200);

                server.stop(done);
            });
        });
    });

    it('Authenticated user info is displayed', function (done) {

        University.init(internals.manifest, internals.composeOptions, function (err, server) {

            expect(err).to.not.exist();


            // Successfull Login


            var request = { method: 'POST', url: '/login', payload: internals.loginCredentials('foo', 'foo') };

            internals.server = server;

            internals.server.select('api').inject(request, function (res) {

                console.log(res);

                expect(res.statusCode, 'Status code').to.equal(200);
                expect(res.result.username).to.equal('Foo Foo');

                var header = res.headers['set-cookie'];

                expect(header.length).to.equal(1);
                expect(header[0]).to.contain('Max-Age=60');

                var cookie = header[0].match(/(?:[^\x00-\x20\(\)<>@\,;\:\\"\/\[\]\?\=\{\}\x7F]+)\s*=\s*(?:([^\x00-\x20\"\,\;\\\x7F]*))/);


                // ./home greets authenticated user


                var request2 = { method: 'GET', url: '/home', headers: { cookie: 'hapi-university=' + cookie[1] } };

                internals.server.select('web-tls').inject(request2, function (res) {

                    var $ = Cheerio.load(res.result);
                    var result = ($('h1', 'body').text());

                    expect(result).to.equal('Foo Foo');
                    internals.server.stop(done);
                });
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
            labels: ['web-tls', 'api'],
            tls: Config.tls
        }
    ],
    plugins: {
        './home': [{
            'select': ['web', 'web-tls']
        }],
        './auth-cookie': {},
        'hapi-auth-cookie': {}
    }
};

internals.composeOptions = {
    relativeTo: Path.resolve(__dirname, '../lib')
};

internals.loginCredentials = function (username, password) {

    return JSON.stringify({ username: username, password: password });
};
