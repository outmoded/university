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
        expect(res.result.version).to.equal('1.0.7');

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
