'use strict';

// Load modules

const Code = require('code');
const Lab = require('lab');
const University = require('../lib');
const Path = require('path');
const Config = require('../lib/config');
const Good = require('../lib/good');
const GoodPlugin = require('good');
const Hoek = require('hoek');
const Fs = require('fs');

// Declare internals

const internals = {};

internals.goodFilePath = './test/fixtures/awesomeLog.json';

// Test shortcuts

const lab = exports.lab = Lab.script();
const describe = lab.experiment;
const expect = Code.expect;
const it = lab.test;
const beforeEach = lab.beforeEach;

describe('/good', () => {

    // Leave log file around till next test run for manual inspection
    beforeEach(done => {
        Fs.truncate(internals.goodFilePath, (err) => {

            Hoek.assert(!err, 'There was an error cleaning up the test log file. In order for future tests to pass, ensure you delete '+internals.goodFilePath);
            done();
        });
    });

    it('errors on failed registering good registration plugin', { parallel: false }, (done) => {

        const orig = Good.register;

        Good.register = function (plugin, options, next) {

            Good.register = orig;
            return next(new Error('fail'));
        };

        Good.register.attributes = {
            name: 'fake good'
        };

        University.init(internals.manifest, internals.composeOptions, (err) => {

            expect(err).to.exist();
            done();
        });
    });

    it('errors on failed registering of good plugin', { parallel: false }, (done) => {

        const orig = GoodPlugin.register;

        GoodPlugin.register = function (plugin, options, next) {

            GoodPlugin.register = orig;
            return next(new Error('fail'));
        };

        GoodPlugin.register.attributes = {
            name: 'fake good failure'
        };

        University.init(internals.manifest, internals.composeOptions, (err) => {

            expect(err).to.exist();
            done();
        });
    });

    it('success registered good', { parallel: false }, (done) => {

        University.init(internals.manifest, internals.composeOptions, (err) => {

            expect(err).to.not.exist();
            done();
        });
    });

    it('options should be correctly passed through to good itself when registering our `good registration plugin`', { parallel: false }, (done) => {

        University.init(internals.manifest, internals.composeOptions, (err, server) => {

            expect(err).to.not.exist();

            // select each connection
            const web = server.select('web');
            const webTls = server.select('web-tls');

            // log these to connection web
            const actualWebLogMsg = 'A: ' + web.info.uri;
            const actualWebLogTags = ['my-web-tag', 'another-tag'];
            server.log(actualWebLogTags, actualWebLogMsg);
            // Expect this is found from logging on previous line
            const expectedWebDataPart = 'A: http';

            // rinse/repeat for webTls connection
            const actualWebTlsLogMsg = 'B: ' + webTls.info.uri;
            const actualWebTlsLogTags = ['my-web-tls-tag', 'fourth-tag'];
            server.log(actualWebTlsLogTags, actualWebTlsLogMsg);
            const expectedWebTlsDataPart = 'B: https';

            // Single event is coalesced from the 2 we fired b/c we did them in same event loop turn
            server.on('log', (/*event, tags*/) => {
                Fs.readFile(internals.goodFilePath, { encoding: 'utf8' }, (err, contents) => {

                    expect(err).to.not.exist();

                    const lines = contents.trim().split('\n');

                    const webLogJson = JSON.parse(lines[0]);
                    const webTlsLogJson = JSON.parse(lines[1]);

                    expect(webLogJson.data).to.include(expectedWebDataPart);
                    expect(webLogJson.tags).to.equal(actualWebLogTags);

                    expect(webTlsLogJson.data).to.include(expectedWebTlsDataPart);
                    expect(webTlsLogJson.tags).to.equal(actualWebTlsLogTags);

                    done();
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
            plugin: {
                register: './good',
                options: {
                    ops: { interval: 1000 },
                    reporters: {
                        myFileReporter: [{
                            module: 'good-squeeze',
                            name: 'Squeeze',
                            args: [{ log: '*', }] // Required for `server.log`. There are many log events that are important, check out the good docs for more :)
                        }, {
                            module: 'good-squeeze',
                            name: 'SafeJson'
                        }, {
                            module: 'good-file',
                            args: [internals.goodFilePath]
                        }]
                    }

                }
            }
        }
    ]
};

internals.composeOptions = {
    relativeTo: Path.resolve(__dirname, '../lib')
};
