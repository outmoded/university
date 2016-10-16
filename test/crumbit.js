'use strict';

// Load modules

const Code = require('code');
const Lab = require('lab');
const University = require('../lib');
const ApiUser = require('../lib/api/user');
const Hoek = require('hoek');
const Path = require('path');
const Config = require('../lib/config');
const Crumb = require('crumb');
const Crumbit = require('../lib/crumbit');


// Declare internals

const internals = {};


// Test shortcuts

const lab = exports.lab = Lab.script();
const describe = lab.experiment;
const expect = Code.expect;
const it = lab.test;


describe('/crumbit', () => {

    it('errors on failed registration of crumbit', { parallel: false }, (done) => {

        const orig = Crumb.register;

        Crumb.register = function (plugin, options, next) {

            Crumb.register = orig;
            return next(new Error('fail'));
        };

        Crumb.register.attributes = {
            name: 'fake crumb'
        };

        University.init(internals.manifest, internals.composeOptions, (err) => {

            expect(err).to.exist();

            done();
        });
    });

    it('errors on missing Crumbit plugin', (done) => {

        const manifest = Hoek.clone(internals.manifest);
        manifest.registrations.splice(3,1);

        University.init(manifest, internals.composeOptions, (err, server) => {

            expect(err).to.exist();
            expect(err.message).to.equal('Plugin ' + ApiUser.register.attributes.name + ' missing dependency ' +
                Crumbit.register.attributes.name + ' in connection: ' + server.select('web-tls').info.uri);

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
            plugin: './api/user',
            options: {
                select: ['web-tls']
            }
        },
        {
            plugin: './auth-cookie',
            options: {
                select: ['web-tls']
            }
        },
        {
            plugin: 'hapi-auth-cookie'
        },
        {
            plugin: {
                register: './crumbit',
                options: Config.crumbOptions,
            },
            options: {
                select: ['web-tls']
            }
        },
        {
            plugin: 'vision'
        },
        {
            plugin: 'inert'
        }
    ]
};

internals.composeOptions = {
    relativeTo: Path.resolve(__dirname, '../lib')
};
