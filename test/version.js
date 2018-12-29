'use strict';

// Credits: test boiler plate based off work by
// @idanwe https://github.com/idanwe
// See this PR: https://github.com/hapijs/university/pull/85

const Lab = require('lab');
const Code = require('code');
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
    }
};


describe('/version', () => {

    it('success', { parallel: false }, async () => {

        const server = await University.init(internals.serverConfigs);

        expect(server).to.be.an.object();

        const request = { method: 'GET', url: '/version', headers: { authorization: 'Bearer 1234574' } };

        const res = await server.inject(request);

        expect(res.result.message).to.equal('options.message now passed using server.app.message');
        expect(res.result.version).to.equal('1.0.8');

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

        expect(res.result.message).to.equal('welcome');
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
});
