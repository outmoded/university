'use strict';

// Load modules

const Hapi = require('hapi');
const Code = require('code');
const Lab = require('lab');
const University = require('../lib');
const Version = require('../lib/version');


// Test shortcuts

const lab = exports.lab = Lab.script();
const expect = Code.expect;
const it = lab.test;


it('starts server and returns hapi server object', (done) => {

    University.init(0, (err, server) => {

        expect(err).to.not.exist();
        expect(server).to.be.instanceof(Hapi.Server);

        server.stop(done);
    });
});

it('starts server on provided port', (done) => {

    University.init(5000, (err, server) => {

        expect(err).to.not.exist();
        expect(server.info.port).to.equal(5000);

        server.stop(done);
    });
});

it('handles register plugin errors', { parallel: false }, (done) => {

    const orig = Version.register;
    
    Version.register = function (server, options, next) {

        Version.register = orig;
        return next(new Error('register version failed'));
    };

    Version.register.attributes = {
        name: 'fake version'
    };

    University.init(0, (err, server) => {

        expect(err).to.exist();
        expect(err.message).to.equal('register version failed');

        done();
    });
});
