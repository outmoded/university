'use strict';

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

        expect(res.result.message).to.equal('option passed to version plugin');
        expect(res.result.version).to.equal('0.1.3');

        await server.stop();
    });
});
