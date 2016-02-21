'use strict';

// Load modules

const Hapi = require('hapi');
const Code = require('code');
const Lab = require('lab');
const University = require('../lib');
const Version = require('../lib/version');
const Path = require('path');


// Declare internals

const internals = {};


// Test shortcuts

const lab = exports.lab = Lab.script();
const expect = Code.expect;
const it = lab.test;


it('starts server and returns hapi server object', (done) => {

    const manifest = {};
    const options = {};

    University.init(manifest, options, (err, server) => {

        expect(err).to.not.exist();
        expect(server).to.be.instanceof(Hapi.Server);

        server.stop(done);
    });
});

it('starts server on provided port', (done) => {

    const manifest = {
        connections: [
            {
                port: 5000
            }
        ]
    };
    const options = {};

    University.init(manifest, options, (err, server) => {

        expect(err).to.not.exist();
        expect(server.info.port).to.equal(5000);

        server.stop(done);
    });
});

it('handles register plugin errors', { parallel: false }, (done) => {

    const manifest = {
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

    const orig = Version.register;
    Version.register = function (server, options, next) {

        Version.register = orig;
        return next(new Error('register version failed'));
    };

    Version.register.attributes = {
        name: 'fake version'
    };

    University.init(manifest, internals.composeOptions, (err, server) => {

        expect(err).to.exist();
        expect(err.message).to.equal('register version failed');

        done();
    });
});


internals.composeOptions = {
    relativeTo: Path.resolve(__dirname, '../lib')
};
