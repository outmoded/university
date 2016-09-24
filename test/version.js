'use strict';

// Load modules

const Code = require('code');
const Lab = require('lab');
const Package = require('../package.json');
const University = require('../lib');
const Path = require('path');
const Config = require('../lib/config');

// Declare internals

const internals = {};

// Test shortcuts

const lab = exports.lab = Lab.script();
const describe = lab.experiment;
const expect = Code.expect;
const it = lab.test;


describe('/version', () => {

    it('ensures /version always redirected to use https', (done) => {

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

    it('returns the version from package.json', (done) => {

        University.init(internals.manifest, internals.composeOptions, (err, server) => {

            expect(err).to.not.exist();

            server.select('web-tls').inject('/version', (res) => {

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
