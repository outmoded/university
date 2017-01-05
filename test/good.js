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
const afterEach = lab.afterEach;

describe('/good', () => {

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
});

describe('/good integration', () => {

    // We use a seperate describe block so we can ensure we cleanup as this test creates a real log file
    afterEach((done) => {

        Fs.truncate(internals.goodFilePath, (err) => {

            Hoek.assert(!err, err);
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
            // const expectedWebTlsDataPart = 'B: https';

            server.on('log', (/*event, tags*/) => {

                // Single event is coalesced from the 2 we fired b/c we did them in same event loop turn
                // @note travis fixes
                // For some reason when .travis executed tests on github only the first
                // server.log made it into internals.goodFilePath.  Hence broke the one test into
                // two. And, only tested one server.log() in each test.  travis was ok with that.
                Fs.readFile(internals.goodFilePath, { encoding: 'utf8' }, (err, contents) => {

                    expect(err).to.not.exist();
                    const lines = contents.trim().split('\n');
                    const webLogJson = JSON.parse(lines[0]);
                    expect(webLogJson.data).to.include(expectedWebDataPart);
                    expect(webLogJson.tags).to.equal(actualWebLogTags);

                    done();
                });
            });
        });
    });

    it('tls options should be correctly passed to good itself when registering our `good registration plugin`', { parallel: false }, (done) => {

        University.init(internals.manifest, internals.composeOptions, (err, server) => {

            expect(err).to.not.exist();

            // select each connection
            const web = server.select('web');
            const webTls = server.select('web-tls');

            // log for webTls connection
            const actualWebTlsLogMsg = 'B: ' + webTls.info.uri;
            const actualWebTlsLogTags = ['my-web-tls-tag', 'fourth-tag'];
            server.log(actualWebTlsLogTags, actualWebTlsLogMsg);
            const expectedWebTlsDataPart = 'B: https';

            // rinse/repeat log these to connection web
            const actualWebLogMsg = 'A: ' + web.info.uri;
            const actualWebLogTags = ['my-web-tag', 'another-tag'];
            server.log(actualWebLogTags, actualWebLogMsg);
            // Expect this is found from logging on previous line
            // const expectedWebDataPart = 'A: http';

            // Single event is coalesced from the 2 we fired b/c we did them in same event loop turn
            server.on('log', (/*event, tags*/) => {

                Fs.readFile(internals.goodFilePath, { encoding: 'utf8' }, (err, contents) => {

                    expect(err).to.not.exist();

                    const lines = contents.trim().split('\n');

                    // const webLogJson = JSON.parse(lines[1]);
                    const webTlsLogJson = JSON.parse(lines[0]);

                    // expect(webLogJson.data).to.include(expectedWebDataPart);
                    // expect(webLogJson.tags).to.equal(actualWebLogTags);

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
                            args: [{ log: '*' }] // Required for `server.log`. There are many log events that are important, check out the good docs for more :)
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
