'use strict';

// Credits: Script based off work by
// @idanwe https://github.com/idanwe
// See this PR: https://github.com/hapijs/university/pull/85

const Lab = require('lab');
const Code = require('code');

// Test shortcuts

const lab = exports.lab = Lab.script();
const describe = lab.experiment;
const expect = Code.expect;
const it = lab.test;

const University = require('../lib');

const internals = {};

internals.serverConfigs = {
    server: {
        port: 0
    }
};


describe('/version', () => {

    it('/version success', { parallel: false }, async () => {

        const server = await University.init(internals.serverConfigs);

        expect(server).to.be.an.object();

        const res = await server.inject('/version');

        expect(res.result.message).to.equal('options.message now passed using server.app.message');
        expect(res.result.version).to.equal('1.0.5');

        await server.stop();
    });
});
