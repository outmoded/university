// Load modules

var Code = require('code');
var Lab = require('lab');
var Path = require('path');
var Hoek = require('hoek');
var University = require('../lib');
var Users = require('../lib/users.json');
var Auth = require('../lib/auth');
var Config = require('../lib/config.js');

// Declare internals

var internals = {};


// Test shortcuts

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;


describe('/private', function () {

    it('Should redirct http to https', function (done) {

        University.init(internals.manifest, internals.composeOptions, function (err, server) {

            expect(err).to.not.exist();

            var request = {method: 'GET', url: '/private'};
            server.inject(request, function (res) {

                expect(res.statusCode, 'Status code').to.equal(301);
                expect(res.headers.location).to.equal('https://localhost:8001/private');

                server.stop(done);
            });
        });
    });

    it('Returns a greeting for the authenticated user', function (done) {

        University.init(internals.manifest, internals.composeOptions, function (err, server) {

            expect(err).to.not.exist();

            var tlsServer = server.select('web-tls');

            var request = { method: 'GET', url: '/private', headers: { authorization: internals.header('foo', Users.foo.password) } };
            tlsServer.inject(request, function (res) {

                expect(res.statusCode, 'Status code').to.equal(200);
                expect(res.result, 'result').to.equal('<div>Hello foo</div>');

                server.stop(done);
            });
        });
    });

    it('Errors on wrong password', function (done) {

        University.init(internals.manifest, internals.composeOptions, function (err, server) {

            expect(err).to.not.exist();

            var tlsServer = server.select('web-tls');

            var request = { method: 'GET', url: '/private', headers: { authorization: internals.header('foo', '') } };
            tlsServer.inject(request, function (res) {

                expect(res.statusCode, 'Status code').to.equal(401);

                server.stop(done);
            });
        });
    });

    it('Errors on failed auth', function (done) {

        University.init(internals.manifest, internals.composeOptions, function (err, server) {

            expect(err).to.not.exist();

            var tlsServer = server.select('web-tls');

            var request = { method: 'GET', url: '/private', headers: { authorization: internals.header('I do not exist', '') } };
            tlsServer.inject(request, function (res) {

                expect(res.statusCode, 'Status code').to.equal(401);

                server.stop(done);
            });
        });
    });

    it('Errors on failed registering of auth', { parallel: false }, function (done) {

        var orig = Auth.register;

        Auth.register = function (plugin, options, next) {

            Auth.register = orig;
            return next(new Error('fail'));
        };

        Auth.register.attributes = {
            name: 'fake hapi-auth-basic'
        };

        University.init(internals.manifest, internals.composeOptions, function (err) {

            expect(err).to.exist();

            done();
        });
    });

    it('Errors on missing Auth plugin', function (done) {

        var manifest = Hoek.clone(internals.manifest);
        delete manifest.plugins['./auth'];

        var failingInit = University.init.bind(University, manifest, internals.composeOptions, function (err) {

            done();
        });

        expect(failingInit).to.throw();

        done();
    });
});


internals.header = function (username, password) {

    return 'Basic ' + (new Buffer(username + ':' + password, 'utf8')).toString('base64');
};

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
        './private': [{
            'select': ['web', 'web-tls']
        }],
        './auth': {},
        'hapi-auth-basic': {}
    }
};

internals.composeOptions = {
    relativeTo: Path.resolve(__dirname, '../lib')
};
