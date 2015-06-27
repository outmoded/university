// Load modules

var Code = require('code');
var Lab = require('lab');
var University = require('../lib');
var Path = require('path');
var Config = require('../lib/config');
var Cheerio = require('cheerio');
var Auth = require('hapi-auth-cookie');
var Hoek = require('hoek');

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
            var request = { method: 'GET', url: '/home' };

            server.select('web-tls').inject(request, function (res) {

                expect(res.statusCode, 'Status code').to.equal(200);

                // expect(res.raw.req.headers.location).to.equal('https://localhost:8001/home');

                //expect(res.raw.req.result).to.equal('result');

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

describe('./account', function () {

    it('logged in (admin) user has admin information loaded.', function (done) {

        University.init(internals.manifest, internals.composeOptions, function (err, server) {

            expect(err).to.not.exist();


            // Successfull Login


            var request = { method: 'POST', url: '/login', payload: internals.loginCredentials('foo', 'foo') };

            internals.server = server;

            internals.server.select('api').inject(request, function (res) {

                expect(res.statusCode, 'Status code').to.equal(200);
                expect(res.result.username).to.equal('Foo Foo');

                var header = res.headers['set-cookie'];
                expect(header.length).to.equal(1);

                expect(header[0]).to.contain('Max-Age=60');

                internals.cookie = header[0].match(/(?:[^\x00-\x20\(\)<>@\,;\:\\"\/\[\]\?\=\{\}\x7F]+)\s*=\s*(?:([^\x00-\x20\"\,\;\\\x7F]*))/);


                // ./account greets authenticated admin user


                var request2 = { method: 'GET', url: '/account', headers: { cookie: 'hapi-university=' + internals.cookie[1] } };

                internals.server.select('web-tls').inject(request2, function (res) {

                    var $ = Cheerio.load(res.result);
                    var result = ($('h3', 'body').text());

                    expect(result).to.equal('Foo Foo Account');

                    internals.server.stop(done);
                });
            });
        });
    });

    it('logged in (non-admin) user has information loaded.', function (done) {

        University.init(internals.manifest, internals.composeOptions, function (err, server) {

            expect(err).to.not.exist();


            // Successfull Login non-admin user


            var request = { method: 'POST', url: '/login', payload: internals.loginCredentials('bar', 'bar') };

            internals.server = server;

            internals.server.select('api').inject(request, function (res) {

                expect(res.statusCode, 'Status code').to.equal(200);
                expect(res.result.username).to.equal('Bar Head');

                var header = res.headers['set-cookie'];

                expect(header.length).to.equal(1);
                expect(header[0]).to.contain('Max-Age=60');

                internals.cookie = header[0].match(/(?:[^\x00-\x20\(\)<>@\,;\:\\"\/\[\]\?\=\{\}\x7F]+)\s*=\s*(?:([^\x00-\x20\"\,\;\\\x7F]*))/);


                // ./account greets authenticated non-admin user


                var request2 = { method: 'GET', url: '/account', headers: { cookie: 'hapi-university=' + internals.cookie[1] } };

                internals.server.select('web-tls').inject(request2, function (res) {

                    var $ = Cheerio.load(res.result);
                    var result = ($('h3', 'body').text());

                    expect(result).to.equal('Bar Bar Account');

                    internals.server.stop(done);
                });
            });
        });
    });
});

describe('./account', function () {

    it('logged in (admin) user accesses /admin page.', function (done) {

        University.init(internals.manifest, internals.composeOptions, function (err, server) {

            expect(err).to.not.exist();


            // Admin user successfull Login


            var request = { method: 'POST', url: '/login', payload: internals.loginCredentials('foo', 'foo') };

            internals.server = server;

            internals.server.select('api').inject(request, function (res) {

                expect(res.statusCode, 'Status code').to.equal(200);
                expect(res.result.username).to.equal('Foo Foo');

                var header = res.headers['set-cookie'];

                expect(header.length).to.equal(1);
                expect(header[0]).to.contain('Max-Age=60');

                internals.cookie = header[0].match(/(?:[^\x00-\x20\(\)<>@\,;\:\\"\/\[\]\?\=\{\}\x7F]+)\s*=\s*(?:([^\x00-\x20\"\,\;\\\x7F]*))/);


                // ./admin route greets authenticated admin user


                var request2 = { method: 'GET', url: '/admin', headers: { cookie: 'hapi-university=' + internals.cookie[1] } };

                internals.server.select('web-tls').inject(request2, function (res) {

                    var $ = Cheerio.load(res.result);
                    var result = ($('h3', 'body').text());

                    expect(result).to.equal('Success, you accessed the admin page!');
                    internals.server.stop(done);
                });
            });
        });
    });
});

describe('hapi-auth-cookie', function () {

    it('errors on failed registering of auth-cookie', { parallel: false }, function (done) {

        var orig = Auth.register;

        Auth.register = function (plugin, options, next) {

            Auth.register = orig;
            return next(new Error('fail'));
        };

        Auth.register.attributes = {
            name: 'fake hapi-auth-cookie'
        };

        University.init(internals.manifest, internals.composeOptions, function (err) {

            expect(err).to.exist();

            done();
        });
    });

    it('errors on missing Auth cookie plugin', function (done) {

        var manifest = Hoek.clone(internals.manifest);

        delete manifest.plugins['./auth-cookie'];

        var failingInit = University.init.bind(University, manifest, internals.composeOptions, function (err) {

            expect(err).to.exist();
            done();
        });

        expect(failingInit).to.throw();
        done();
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
        './api/login': [{
            'select': ['api']
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
