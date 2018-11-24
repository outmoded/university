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


describe('/index', () => {

    it('start up server', async () => {

        const server = await University.init(internals.serverConfigs);

        expect(server).to.be.an.object();

        await server.stop();
    });

    it('failed start up', { parallel: false }, async (done) => {

        const original = internals.serverConfigs.server.port;
        internals.serverConfigs.server.port = 'dirty bugs';

        try {

            await  University.init(internals.serverConfigs);
        }
        catch (err) {

            internals.serverConfigs.server.port = original;
            expect(err.message).to.be.a.string().and.contain(['Invalid server options']);
        }
    });

    it('uses process.env.PORT', { parallel: false }, async (done) => {

        process.env.PORT = 0;

        const server = await  University.init(internals.serverConfigs);

        expect(server).to.be.an.object();

        await server.stop();

        delete process.env.PORT;
    });
});
