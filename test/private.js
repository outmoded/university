'use strict';

// Load modules

const Code = require('code');
const Lab = require('lab');
const University = require('../lib');
const Users = require('../lib/users.json');
const Auth = require('../lib/auth');
const Private = require('../lib/private');
const Path = require('path');
const Hoek = require('hoek');
const Config = require('../lib/config');

// Declare internals

const internals = {};

// Test shortcuts

const lab = exports.lab = Lab.script();
const describe = lab.experiment;
const expect = Code.expect;
const it = lab.test;


describe('/private', () => {

    it('ensures /private is always redirected to use https', (done) => {

        University.init(internals.manifest, internals.composeOptions, (err, server) => {

            expect(err).to.not.exist();

            const web = server.select('web');
            const webTls = server.select('web-tls');

            const request = {
                method: 'GET',
                url: '/private'
            };
            web.inject(request, (res) => {

                expect(res.statusCode, 'Status code').to.equal(301);
                expect(res.headers.location).to.equal(webTls.info.uri + '/private');

                server.stop(done);
            });
        });
    });

    it('returns a greeting for the authenticated user', (done) => {

        University.init(internals.manifest, internals.composeOptions, (err, server) => {

            expect(err).to.not.exist();

            const request = {
                method: 'GET',
                url: '/private',
                headers: {
                    authorization: internals.header('foo', Users.foo.password)
                }
            };

            server.select('web-tls').inject(request, (res) => {

                expect(res.statusCode, 'Status code').to.equal(200);
                expect(res.result, 'result').to.equal('<div>Hello foo</div>');

                server.stop(done);
            });
        });
    });

    it('errors on wrong password', (done) => {

        University.init(internals.manifest, internals.composeOptions, (err, server) => {

            expect(err).to.not.exist();

            const request = {
                method: 'GET',
                url: '/private',
                headers: {
                    authorization: internals.header('foo', '')
                }
            };

            server.select('web-tls').inject(request, (res) => {

                expect(res.statusCode, 'Status code').to.equal(401);

                server.stop(done);
            });
        });
    });

    it('errors on failed auth', (done) => {

        University.init(internals.manifest, internals.composeOptions, (err, server) => {

            expect(err).to.not.exist();

            const request = {
                method: 'GET',
                url: '/private',
                headers: {
                    authorization: internals.header('I do not exist', '')
                }
            };

            server.select('web-tls').inject(request, (res) => {

                expect(res.statusCode, 'Status code').to.equal(401);

                server.stop(done);
            });
        });
    });

    it('errors on failed registering of auth', { parallel: false }, (done) => {

        const orig = Auth.register;

        Auth.register = function (plugin, options, next) {

            Auth.register = orig;
            return next(new Error('fail'));
        };

        Auth.register.attributes = {
            name: 'fake Auth'
        };

        University.init(internals.manifest, internals.composeOptions, (err) => {

            expect(err).to.exist();

            done();
        });
    });

    it('errors on missing Auth plugin', (done) => {

        const manifest = Hoek.clone(internals.manifest);
        manifest.registrations.splice(1,1);

        University.init(manifest, internals.composeOptions, (err, server) => {

            expect(err).to.exist();
            expect(err.message).to.equal('Plugin ' + Private.register.attributes.name + ' missing dependency ' + Auth.register.attributes.name +
                                         ' in connection: ' + server.select('web').info.uri);

            done();
        });
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
    registrations: [
        {
            plugin: './private'
        },
        {
            plugin: './auth'
        },
        {
            plugin: 'hapi-auth-basic'
        }
    ]
};

internals.composeOptions = {
    relativeTo: Path.resolve(__dirname, '../lib')
};
