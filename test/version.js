'use strict';

// Load modules

const Code = require('code');
const Lab = require('lab');
const Package = require('../package.json');
const University = require('../lib');
const Path = require('path');


// Declare internals

const internals = {};


// Test shortcuts

const lab = exports.lab = Lab.script();
const describe = lab.experiment;
const expect = Code.expect;
const it = lab.test;


describe('/version', () => {

    it('returns the version from package.json', (done) => {

        University.init(internals.manifest, internals.composeOptions, (err, server) => {

            expect(err).to.not.exist();

            server.inject('/version', (res) => {

                expect(res.statusCode).to.equal(200);
                expect(res.result).to.equal({ version: Package.version });

                server.stop(done);
            });
        });
    });
});


internals.manifest = {
    connections: [
        {
            port: 0
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
