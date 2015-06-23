
var Code = require('code');
var Lab = require('lab');
var University = require('../../lib');
var Path = require('path');
var Config = require('../../lib/config');

// Declare internals

var internals = {};


// Test shortcuts

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;

describe('/login', function () {

    it('Ensure login works', function (done) {

        University.init(internals.manifest, internals.composeOptions, function (err, server) {

            expect(err).to.not.exist();

            var request = { method: 'POST', url: '/login', payload: internals.login_credentials('foo', 'foo')};

            var tlserver = server.select('web-tls');

            tlserver.inject(request, function (res) {

                expect(res.statusCode, 'Status code').to.equal(200);
                expect(res.result.username).to.equal('Foo Foo');


                // Get cookie
                var header = res.headers['set-cookie'];
                expect(header.length).to.equal(1);
                expect(header[0]).to.contain('Max-Age=60');
                //expect(header[0]).to.contain('Max-Age=60');
                var cookie = header[0].match(/(?:[^\x00-\x20\(\)<>@\,;\:\\"\/\[\]\?\=\{\}\x7F]+)\s*=\s*(?:([^\x00-\x20\"\,\;\\\x7F]*))/);
                // expect(res.headers.location).to.equal('https://localhost:8001/home');
                
                tlserver.inject({ method: 'GET', url: '/home', headers: res.headers }, function (res) {

                    // expect(res.headers['set-cookie']).to.not.exist();
                    // 302 redirects to another uri
                    expect(res.statusCode).to.equal(200);

                    expect(res.result).to.equal('Foo Foo');
                    server.stop(done);
                    //done();
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

internals.login_credentials = function (username, password) {

    return JSON.stringify({"username": username , "password": password});
};
