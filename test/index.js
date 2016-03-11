'use strict';

// Load modules

const Hapi = require('hapi');
const Code = require('code');
const Lab = require('lab');
const University = require('../lib');
const Version = require('../lib/version');
const Path = require('path');
const Config = require('../lib/config');

// Declare internals

const internals = {};


// Test shortcuts

const lab = exports.lab = Lab.script();
const describe = lab.experiment;
const expect = Code.expect;
const it = lab.test;


describe('/index', () => {

    it('starts server and returns hapi server object', (done) => {

        University.init(internals.manifest, internals.composeOptions, (err, server) => {

            expect(err).to.not.exist();
            expect(server).to.be.instanceof(Hapi.Server);

            server.stop(done);
        });
    });

    it('starts server on provided port', (done) => {

        const manifest = {
            connections: [
                {
                    port: 5000,
                    labels: ['web']
                },
                {
                    port: 5001,
                    labels: ['web-tls'],
                    tls: Config.tls
                }
            ]
        };
        const options = {};

        University.init(manifest, options, (err, server) => {

            expect(err).to.not.exist();

            const web = server.select('web');
            const webTls = server.select('web-tls');

            expect(web.info.port).to.equal(5000);
            expect(webTls.info.port).to.equal(5001);

            server.stop(done);
        });
    });

    it('handles register plugin errors', { parallel: false }, (done) => {

        const orig = Version.register;
        Version.register = (server, options, next) => {

            Version.register = orig;
            return next(new Error('register version failed'));
        };

        Version.register.attributes = {
            name: 'fake version'
        };

        University.init(internals.manifest, internals.composeOptions, (err, server) => {

            expect(err).to.exist();
            expect(err.message).to.equal('register version failed');

            done();
        });
    });

    it('forces re-routing to https', (done) => {

        University.init(internals.manifest, internals.composeOptions, (err, server) => {

            expect(err).to.not.exist();

            const web = server.select('web');
            const webTls = server.select('web-tls');

            web.inject('/version', (res) => {

                expect(res.statusCode).to.equal(301);
                expect(res.headers.location).to.equal(webTls.info.uri + '/version');

                server.stop(done);
            });
        });
    });

    it('redirects when non-existing route requested.', (done) => {

        University.init(internals.manifest, internals.composeOptions, (err, server) => {

            expect(err).to.not.exist();
            expect(server).to.be.instanceof(Hapi.Server);

            const webTls = server.select('web-tls');

            const request = {
                method: 'GET',
                url: '/waka'
            };

            webTls.inject(request, (res) => {

                expect(res.statusCode, 'Status code').to.equal(301);
                expect(res.headers.location).to.equal(webTls.info.uri + '/home');

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
    registrations: [
        {
            plugin: './version'
        }
    ]
};

internals.composeOptions = {
    relativeTo: Path.resolve(__dirname, '../lib')
};
