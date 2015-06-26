
var Code = require('code');
var Lab = require('lab');
var University = require('../../lib');
var Path = require('path');
var Config = require('../../lib/config');
var Cheerio = require('cheerio');

// Declare internals

var internals = {};


// Test shortcuts

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;



describe('/login', function () {

    it('GET request access login page', function (done) {

        University.init(internals.manifest, internals.composeOptions, function (err, server) {

            var request1 = { method: 'GET', url: '/login' };

            server.select('web-tls').inject(request1, function (res) {

                // expect(res.result).to.equal('foofoo');

                expect(res.statusCode, 'Status code').to.equal(200);

                server.stop(done);
            });
        });
    });

    it('POST logged in user gets redirected', function (done) {

        University.init(internals.manifest, internals.composeOptions, function (err, server) {

            expect(err).to.not.exist();

            var request = { method: 'POST', url: '/login', payload: internals.loginCredentials('foo', 'foo') };

            // Successfull Login

            internals.server = server;

            internals.server.select('api').inject(request, function (res) {

                expect(res.statusCode, 'Status code').to.equal(200);
                expect(res.result.username).to.equal('Foo Foo');

                var header = res.headers['set-cookie'];
                expect(header.length).to.equal(1);

                expect(header[0]).to.contain('Max-Age=60');

                // var cookie = header[0].match(/(?:[^\x00-\x20\(\)<>@\,;\:\\"\/\[\]\?\=\{\}\x7F]+)\s*=\s*(?:([^\x00-\x20\"\,\;\\\x7F]*))/);

                internals.cookie = header[0].match(/(?:[^\x00-\x20\(\)<>@\,;\:\\"\/\[\]\?\=\{\}\x7F]+)\s*=\s*(?:([^\x00-\x20\"\,\;\\\x7F]*))/);


                // ./home greets authenticated user

                var request2 = { method: 'GET', url: '/home', headers: { cookie: 'hapi-university=' + internals.cookie[1] } };

                internals.server.select('web-tls').inject(request2, function (res) {

                    var $ = Cheerio.load(res.result);
                    var result = ($('h1', 'body').text());

                    expect(result).to.equal('Foo Foo');


                    // ./login GET redirects to account if already logged in.


                    var request3 = { method: 'GET', url: '/login', headers: { cookie: 'hapi-university=' + internals.cookie[1] } };

                    internals.server.select('web-tls').inject(request3, function (res) {

                        expect(res.statusCode, 'Status code').to.equal(302);  // redirected
                        expect(res.headers.location).to.include('/account');

                        internals.server.stop(done);
                    });
                });
            });
        });
    });


    // @todo  split below into tests


    it('Login Fails', function (done) {

        University.init(internals.manifest, internals.composeOptions, function (err, server) {

            var tlserver = server.select('web-tls');

            // Successfull Login

            var request = { method: 'POST', url: '/login', headers: { authorization: internals.loginCredentials('', 'test') } };  // This fails loggin in event w. correct credentials..

            tlserver.inject(request, function (res) {

                expect(res.statusCode, 'Status code').to.equal(401);
                expect(res.result.message).to.equal('Did not submit password or username');
            });


            var request2 = { method: 'POST', url: '/login', headers: { authorization: internals.loginCredentials('foo', 'bamo') } };  // This fails loggin in event w. correct credentials..

            tlserver.inject(request2, function (res) {

                expect(res.statusCode, 'Status code').to.equal(401);
                expect(res.result.message).to.equal('Did not submit password or username');

            });

            var request3 = { method: 'POST', url: '/login', headers: { authorization: internals.loginCredentials('Mamo', 'bamo') } };  // This fails loggin in event w. correct credentials..

            tlserver.inject(request3, function (res) {

                expect(res.statusCode, 'Status code').to.equal(401);
                expect(res.result.message).to.equal('Did not submit password or username');

            });

            var request4 = { method: 'POST', url: '/login', payload: JSON.stringify({ username: 'boot', password: 'toot' }) };  // This fails loggin in event w. correct credentials..

            tlserver.inject(request4, function (res) {

                expect(res.statusCode, 'Status code').to.equal(401);
                expect(res.result.message).to.equal('Invalid password or username');

                server.stop(done);
            });
        });
    });
});

describe('/logout', function () {

    it('Ensure logout works', function (done) {

        University.init(internals.manifest, internals.composeOptions, function (err, server) {

            expect(err).to.not.exist();

            var request = { method: 'POST', url: '/login', payload: internals.loginCredentials('foo', 'foo') };

            var tlserver = server.select('web-tls');


            // Successfull Login


            tlserver.inject(request, function (res) {

                expect(res.statusCode, 'Status code').to.equal(200);
                expect(res.result.username).to.equal('Foo Foo');

                var header = res.headers['set-cookie'];
                expect(header.length).to.equal(1);

                expect(header[0]).to.contain('Max-Age=60');
                var cookie = header[0].match(/(?:[^\x00-\x20\(\)<>@\,;\:\\"\/\[\]\?\=\{\}\x7F]+)\s*=\s*(?:([^\x00-\x20\"\,\;\\\x7F]*))/);


                // ./home greets authenticated user


                var request2 = { method: 'POST', url: '/logout', headers: { cookie: 'hapi-university=' + cookie[1] } };
                tlserver.inject(request2, function (res) {

                    expect(res.result.message).to.equal('Logged out');

                    server.stop(done);
                });
            });
        });
    });

    it('unregistered user tried to access restricted ./logout on api', function (done) {

        University.init(internals.manifest, internals.composeOptions, function (err, server) {

            expect(err).to.not.exist();

            var request = { method: 'POST', url: '/logout' };

            // Successfull Login

            internals.server = server;

            internals.server.select('api').inject(request, function (res) {

                // expect(res.result.username).to.equal('Bar Head');

                expect(res.statusCode, 'Status code').to.equal(302);
                expect(res.headers.location).to.equal('/login');

                internals.server.stop(done);
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
        './api/login': [{
            'select': ['api']
        }],
        './auth-cookie': {},
        'hapi-auth-cookie': {}
    }
};

internals.composeOptions = {
    relativeTo: Path.resolve(__dirname, '../../lib')
};

internals.loginCredentials = function (username, password) {

    return JSON.stringify({ username: username, password: password });
};
