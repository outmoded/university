'use strict';

// Load modules

const Code = require('code');
const Lab = require('lab');
const University = require('../lib');
const Basic = require('hapi-auth-basic');
const Path = require('path');
const Hoek = require('hoek');


// Declare internals

const internals = {};


// Test shortcuts

const lab = exports.lab = Lab.script();
const describe = lab.experiment;
const expect = Code.expect;
const it = lab.test;

describe('/auth', () => {

    it('errors on failed registering of hapi-basic-auth', { parallel: false }, (done) => {

        const  orig = Basic.register;

        Basic.register = function (plugin, options, next) {

            Basic.register = orig;
            return next(new Error('fail'));
        };

        Basic.register.attributes = {
            name: 'fake hapi-auth-basic'
        };

        University.init(internals.manifest, internals.composeOptions, (err) => {

            expect(err).to.exist();

            done();
        });
    });

    it('errors on missing hapi-auth-basic plugin', (done) => {

        // delete manifest.plugins['hapi-auth-basic'];

        const manifest = Hoek.clone(internals.manifest.registrations[1].plugin);
        delete manifest.register;

        const failingInit = University.init.bind(University, manifest, internals.composeOptions, () => {

            return;
        });

        expect(failingInit).to.throw();

        done();
    });
});


internals.header = (username, password) => {

    return 'Basic ' + (new Buffer(username + ':' + password, 'utf8')).toString('base64');
};

// glue manifest

internals.manifest = {
    connections: [
        {
            port: 0
        }
    ],
    registrations: [
        {
            plugin: {
                register: './private',
                options: {}
            }
        },
        {
            plugin: {
                register: 'hapi-auth-basic',
                options: {}
            }
        },
        {
            plugin: {
                register: './university-auth',
                options: {}
            }
        }
    ]
};

internals.composeOptions = {
    relativeTo: Path.resolve(__dirname, '../lib')
};
