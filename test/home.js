'use strict';

// Load modules

const Code = require('code');
const Lab = require('lab');
const University = require('../lib');
const Home = require('../lib/home');
const Vision = require('vision');
const Path = require('path');
const Inert = require('inert');
const Hoek = require('hoek');
const Config = require('../lib/config');

// Declare internals

const internals = {};


// Test shortcuts

const lab = exports.lab = Lab.script();
const describe = lab.experiment;
const expect = Code.expect;
const it = lab.test;


describe('/home', () => {

    it('ensures that /login is always redirected to https', (done) => {

        University.init(internals.manifest, internals.composeOptions, (err, server) => {

            expect(err).to.not.exist();

            const web = server.select('web');
            const webTls = server.select('web-tls');

            const request = {
                method: 'GET',
                url: '/login'
            };
            web.inject(request, (res) => {

                expect(res.statusCode, 'Status code').to.equal(301);
                expect(res.headers.location).to.equal(webTls.info.uri + '/login');

                server.stop(done);
            });
        });
    });

    it('returns a login page via https', (done) => {

        University.init(internals.manifest, internals.composeOptions, (err, server) => {

            expect(err).to.not.exist();

            const webTls = server.select('web-tls');

            const request = {
                method: 'GET',
                url: '/login'
            };
            webTls.inject(request, (res) => {

                expect(res.statusCode, 'Status code').to.equal(200);

                server.stop(done);
            });
        });
    });

    it('ensures that /home is always redirected to https', (done) => {

        University.init(internals.manifest, internals.composeOptions, (err, server) => {

            expect(err).to.not.exist();

            const web = server.select('web');
            const webTls = server.select('web-tls');

            const request = {
                method: 'GET',
                url: '/home'
            };
            web.inject(request, (res) => {

                expect(res.statusCode, 'Status code').to.equal(301);
                expect(res.headers.location).to.equal(webTls.info.uri + '/home');

                server.stop(done);
            });
        });
    });

    it('returns a home page via https', (done) => {

        University.init(internals.manifest, internals.composeOptions, (err, server) => {

            expect(err).to.not.exist();

            const webTls = server.select('web-tls');

            const request = {
                method: 'GET',
                url: '/home'
            };
            webTls.inject(request, (res) => {

                expect(res.statusCode, 'Status code').to.equal(200);

                server.stop(done);
            });
        });
    });

    it('errors on failed registering of vision', { parallel: false }, (done) => {

        const orig = Vision.register;

        Vision.register = function (plugin, options, next) {

            Vision.register = orig;
            return next(new Error('fail'));
        };

        Vision.register.attributes = {
            name: 'fake vision'
        };

        University.init(internals.manifest, internals.composeOptions, (err) => {

            expect(err).to.exist();

            done();
        });
    });

    it('errors on missing vision plugin', (done) => {

        const manifest = Hoek.clone(internals.manifest);
        manifest.registrations.splice(1, 1);

        University.init(manifest, internals.composeOptions, (err, server) => {

            expect(err).to.exist();
            expect(err.message).to.equal('Plugin ' + Home.register.attributes.name + ' missing dependency ' + Vision.register.attributes.pkg.name +
                                         ' in connection: ' + server.select('web').info.uri);

            done();
        });
    });

    it('errors on failed registering of inert', { parallel: false }, (done) => {

        const orig = Inert.register;

        Inert.register = function (plugin, options, next) {

            Inert.register = orig;
            return next(new Error('fail'));
        };

        Inert.register.attributes = {
            name: 'fake inert'
        };

        University.init(internals.manifest, internals.composeOptions, (err) => {

            expect(err).to.exist();

            done();
        });
    });

    it('errors on missing inert plugin', (done) => {

        const manifest = Hoek.clone(internals.manifest);
        manifest.registrations.splice(2, 1);

        University.init(manifest, internals.composeOptions, (err, server) => {

            expect(err).to.exist();
            expect(err.message).to.equal('Plugin ' + Home.register.attributes.name + ' missing dependency ' + Inert.register.attributes.pkg.name +
                                         ' in connection: ' + server.select('web').info.uri);

            done();
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
    registrations: [
        {
            plugin: './home'
        },
        {
            plugin: 'vision'
        },
        {
            plugin: 'inert'
        }
    ]
};

internals.composeOptions = {
    relativeTo: Path.resolve(__dirname, '../lib')
};
