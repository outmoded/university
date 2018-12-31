'use strict';

// Credits:
// test boiler plate based off work by
// @idanwe https://github.com/idanwe
// See this PR: https://github.com/hapijs/university/pull/85

const Lab = require('lab');
const Code = require('code');
const Util = require('util');
const Fs = require('fs');

// Test shortcuts

const lab = exports.lab = Lab.script();
const describe = lab.experiment;
const expect = Code.expect;
const it = lab.test;

const University = require('../lib');

const internals = {};

internals.serverConfigs = {
    server: {
        port: 0,
        tls: {
            key: Fs.readFileSync('lib/certs/key.key'),
            cert: Fs.readFileSync('lib/certs/cert.crt')
        }
    },
    plugins: {
        tokenCache: {
            expiresIn: 30
        }
    }
};


describe('/version', () => {

    it('success', { parallel: false }, async () => {

        const server = await University.init(internals.serverConfigs);

        // authenticate

        const request = { method: 'POST', url: '/authenticate', payload: { username: 'foofoo', password: 'password' } };

        const res = await server.inject(request);

        expect(res.result.message).to.equal('successful authentication');
        expect(res.result.token.length).to.equal(36);

        const request2 = { method: 'GET', url: '/version', headers: { authorization: 'Bearer ' + res.result.token } };

        const res2 = await server.inject(request2);

        expect(res2.result.message).to.equal('options.message now passed using server.app.message');
        expect(res2.result.version).to.equal('1.0.9');

        await server.stop();
    });

    it('fails bad token', { parallel: false }, async () => {

        const server = await University.init(internals.serverConfigs);

        expect(server).to.be.an.object();

        const request = { method: 'GET', url: '/version', headers: { authorization: 'Bearer 1234566' } };

        const res = await server.inject(request);

        expect(res.result.message).to.equal('Bad token');

        await server.stop();
    });
});

describe('/authenticate', () => {

    it('succesfully authenticates', async () => {

        const server = await University.init(internals.serverConfigs);

        // curl -H "Content-Type: application/json" -X POST -d '{"username":"foofoo","password":"12345678"}' https://localhost:8000/authenticate

        const request = { method: 'POST', url: '/authenticate', payload: { username: 'foofoo', password: 'password' } };

        const res = await server.inject(request);

        expect(res.result.message).to.equal('successful authentication');
        expect(res.result.token.length).to.equal(36);
        await server.stop();
    });

    it('fails to authenticate, bad password', async () => {

        const server = await University.init(internals.serverConfigs);

        const request = { method: 'POST', url: '/authenticate', payload: { username: 'foofoo', password: 'bad_password' } };

        const res = await server.inject(request);

        expect(res.result.error).to.equal('Unauthorized');
        expect(res.result.message).to.equal('invalid credentials');
        await server.stop();
    });

    it('fails to authenticate, bad username', async () => {

        const server = await University.init(internals.serverConfigs);

        const request = { method: 'POST', url: '/authenticate', payload: { username: 'bad_username', password: 'password' } };

        const res = await server.inject(request);

        expect(res.result.error).to.equal('Unauthorized');
        expect(res.result.message).to.equal('invalid credentials');
        await server.stop();
    });

    it('returns existing token -- already authenticated', async () => {

        // curl -H "Content-Type: application/json" -X POST -d '{"username":"foofoo","password":"12345678"}' https://localhost:8000/authenticate

        const server = await University.init(internals.serverConfigs);

        const setTimeoutPromise = Util.promisify(setTimeout);

        // use timeout to ensure redis auth token records expire before next test.

        return setTimeoutPromise(100).then(async () => {

            const request = { method: 'POST', url: '/authenticate', payload: { username: 'foofoo', password: 'password' } };

            const res = await server.inject(request);

            expect(res.result.message).to.equal('successful authentication');
            expect(res.result.token.length).to.equal(36);

            const request2 = { method: 'POST', url: '/authenticate', payload: { username: 'foofoo', password: 'password' } };

            const res2 = await server.inject(request2);

            expect(res2.result.message).to.equal('you already registered a token!');
            expect(res2.result.token.length).to.equal(36);
        });

        await server.stop();
    });
});

describe('/private', () => {

    it('admin user accesses private route data', { parallel: false }, async () => {

        const server = await University.init(internals.serverConfigs);

        // use timeout to ensure redis auth token records expire before next test.

        const setTimeoutPromise = Util.promisify(setTimeout);

        return setTimeoutPromise(100).then(async () => {

            const request = { method: 'POST', url: '/authenticate', payload: { username: 'foofoo', password: 'password' } };

            const res = await server.inject(request);

            expect(res.result.message).to.equal('successful authentication');
            expect(res.result.token.length).to.equal(36);

            const request2 = { method: 'POST', url: '/private', headers: { authorization: 'Bearer ' + res.result.token } };

            const res2 = await server.inject(request2);

            expect(res2.result).to.equal('private route data');
        });

        await server.stop();
    });

    it('non-admin user fails to access private route data', async () => {

        const server = await University.init(internals.serverConfigs);

        const setTimeoutPromise = Util.promisify(setTimeout);

        return setTimeoutPromise(100).then(async () => {

            const request = { method: 'POST', url: '/authenticate', payload: { username: 'barica', password: 'barpassword' } };

            const res = await server.inject(request);

            expect(res.result.message).to.equal('successful authentication');
            expect(res.result.token.length).to.equal(36);

            const request2 = { method: 'POST', url: '/private', headers: { authorization: 'Bearer ' + res.result.token } };

            const res2 = await server.inject(request2);

            expect(res2.result.error).to.equal('Forbidden');
            expect(res2.result.message).to.equal('Insufficient scope');
        });

        await server.stop();
    });

    it('expired admin token fails to access private route', { parallel: false }, async () => {

        const server = await University.init(internals.serverConfigs);

        const request = { method: 'POST', url: '/authenticate', payload: { username: 'foofoo', password: 'password' } };

        const res = await server.inject(request);

        expect(res.result.message).to.equal('successful authentication');
        expect(res.result.token.length).to.equal(36);

        // use timeout to ensure token expires before next request executes.

        const setTimeoutPromise = Util.promisify(setTimeout);

        return setTimeoutPromise(100).then(async () => {

            const request2 = { method: 'POST', url: '/private', headers: { authorization: 'Bearer ' + res.result.token } };

            const res2 = await server.inject(request2);

            expect(res2.result.error).to.equal('Unauthorized');
            expect(res2.result.message).to.equal('Bad token');
        });

        await server.stop();
    });
});
