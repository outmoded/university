'use strict';

// Load modules

const Code = require('code');
const Lab = require('lab');
const University = require('../lib');
const Basic = require('hapi-auth-basic');
const Auth = require('../lib/auth');
const Path = require('path');


// Declare internals

const internals = {};


// Test shortcuts

const lab = exports.lab = Lab.script();
const describe = lab.experiment;
const expect = Code.expect;
const it = lab.test;


describe('/auth', () => {

    it('errors on failed registering of hapi-auth-basic', { parallel: false }, (done) => {

        const manifest = {
            connections: [
                {
                    port: 0
                }
            ],
            registrations: [
                {
                    plugin: './auth'
                },
                {
                    plugin: 'hapi-auth-basic'
                }
            ]
        };

        const orig = Basic.register;

        Basic.register = function (plugin, options, next) {

            Basic.register = orig;
            return next(new Error('fail'));
        };

        Basic.register.attributes = {
            name: 'fake hapi-auth-basic'
        };

        University.init(manifest, internals.composeOptions, (err) => {

            expect(err).to.exist();

            done();
        });
    });

    it('errors on missing hapi-auth-basic plugin', (done) => {

        const manifest = {
            connections: [
                {
                    port: 0
                }
            ],
            registrations: [
                {
                    plugin: './auth'
                }
            ]
        };

        University.init(manifest, internals.composeOptions, (err, server) => {

            expect(err).to.exist();
            expect(err.message).to.equal('Plugin ' + Auth.register.attributes.name + ' missing dependency ' + Basic.register.attributes.pkg.name +
                                         ' in connection: ' + server.info.uri);

            done();
        });
    });
});


internals.composeOptions = {
    relativeTo: Path.resolve(__dirname, '../lib')
};
