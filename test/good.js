'use strict';

// Load modules

const Code = require('code');
const Lab = require('lab');
const University = require('../lib');
const Path = require('path');
const Config = require('../lib/config');
const Good = require('../lib/good');
const GoodPlugin = require('good');

// Declare internals

const internals = {};

// Test shortcuts

const lab = exports.lab = Lab.script();
const describe = lab.experiment;
const expect = Code.expect;
const it = lab.test;

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
    return;
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
            plugin: './good',
            options: {
                select: ['web-tls']
            }
        }
    ]
};

internals.composeOptions = {
    relativeTo: Path.resolve(__dirname, '../lib')
};
