'use strict';

// Load modules

const Code = require('code');
const Lab = require('lab');
const University = require('../../lib');
const Path = require('path');
const Config = require('../../lib/config');
const GenerateSession = require('../generateSession');

// Declare internals

const internals = {};


// Test shortcuts

const lab = exports.lab = Lab.script();
const describe = lab.experiment;
const expect = Code.expect;
const it = lab.test;


describe('api/user', () => {

    it('successfull login.', (done) => {

        University.init(internals.manifest, internals.composeOptions, (err, server) => {

            expect(err).to.not.exist();

            const webTls = server.select('web-tls');

            const request = {
                method: 'POST',
                url: '/login',
                payload: {
                    username: 'foo',
                    password: 'foo'
                }
            };

            webTls.inject(request, (res) => {

                expect(res.statusCode, 'Status code').to.equal(200);
                server.stop(done);
            });
        });
    });

    it('fail login no username.', (done) => {

        University.init(internals.manifest, internals.composeOptions, (err, server) => {

            expect(err).to.not.exist();

            const webTls = server.select('web-tls');

            const request = {
                method: 'POST',
                url: '/login',
                payload: {
                    // username: 'foo',
                    password: 'foo'
                }
            };

            webTls.inject(request, (res) => {

                expect(res.result.message, 'message').to.equal('Invalid username or password');
                expect(res.statusCode, 'Status code').to.equal(401);

                server.stop(done);
            });
        });
    });

    it('fail bad username.', (done) => {

        University.init(internals.manifest, internals.composeOptions, (err, server) => {

            expect(err).to.not.exist();

            const webTls = server.select('web-tls');

            const request = {
                method: 'POST',
                url: '/login',
                payload: {
                    username: 'waka',
                    password: 'foo'
                }
            };

            webTls.inject(request, (res) => {

                expect(res.result.message, 'message').to.equal('Invalid username or password');
                expect(res.statusCode, 'Status code').to.equal(401);

                server.stop(done);
            });
        });
    });

    it('joi fail invalid password.', (done) => {

        University.init(internals.manifest, internals.composeOptions, (err, server) => {

            expect(err).to.not.exist();

            const webTls = server.select('web-tls');

            const request = {
                method: 'POST',
                url: '/login',
                payload: {
                    username: 'foo',
                    password: '333999777'
                }
            };

            webTls.inject(request, (res) => {

                expect(res.result.message, 'message').to.equal('Malformed Data Entered');
                expect(res.statusCode, 'Status code').to.equal(400);
                server.stop(done);
            });
        });
    });

    it('fail bad password.', (done) => {

        University.init(internals.manifest, internals.composeOptions, (err, server) => {

            expect(err).to.not.exist();

            const webTls = server.select('web-tls');

            const request = {
                method: 'POST',
                url: '/login',
                payload: {
                    username: 'foo',
                    password: '333'
                }
            };

            webTls.inject(request, (res) => {

                expect(res.result.message, 'message').to.equal('Invalid username or password');
                expect(res.statusCode, 'Status code').to.equal(401);

                server.stop(done);
            });
        });
    });

    it('fail login server.app.cache.set() error.', { parallel: false }, (done) => {

        University.init(internals.manifest, internals.composeOptions, (err, server) => {

            expect(err).to.not.exist();

            const webTls = server.select('web-tls');

            const original = server.app.cache;

            server.app.cache.set = function (one, two, three, callback) {

                server.app.cache = original;
                return callback('mock cache.set failure');
            };

            const request = {
                url: '/login',
                method: 'POST',
                payload: {
                    username: 'foo',
                    password: 'foo'
                }
            };

            webTls.inject(request, (res) => {

                expect(res.result.message).to.equal('mock cache.set failure');
                expect(res.statusCode).to.equal(401);
                server.stop(done);
            });
        });
    });

    it('successful logout redirects /home.', (done) => {

        University.init(internals.manifest, internals.composeOptions, (err, server) => {

            expect(err).to.not.exist();

            const webTls = server.select('web-tls');

            const options = {
                url: '/login',
                method: 'POST',
                payload: {
                    username: 'foo',
                    password: 'foo'
                }
            };

            GenerateSession(server, 'web-tls', options, (err, sessionCookie) => {

                expect(err).to.not.exist();

                const request = {
                    url: '/logout',
                    method: 'POST',
                    headers: { 'cookie': 'sid-example=' + sessionCookie }
                };

                webTls.inject(request, (res) => {

                    expect(res.statusCode, 'Status code').to.equal(200);
                    expect(res.result.message).to.equal('Logged out');
                    server.stop(done);
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
            labels: ['web-tls'],
            tls: Config.tls
        }
    ],
    registrations: [
        {
            plugin: './api/user',
            options: {
                select: ['web-tls']
            }
        },
        {
            plugin: './home',
            options: {
                select: ['web-tls']
            }
        },
        {
            plugin: 'vision'
        },
        {
            plugin: 'inert'
        },
        {
            plugin: './cookie-auth',
            options: {
                select: ['web-tls']
            }
        },
        {
            plugin: 'hapi-auth-cookie'
        }
    ]
};

internals.composeOptions = {
    relativeTo: Path.resolve(__dirname, '../../lib')
};
