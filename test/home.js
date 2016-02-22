'use strict';

// Load modules

const Code = require('code');
const Lab = require('lab');
const University = require('../lib');
const Home = require('../lib/home');
const Vision = require('vision');
const Path = require('path');
const Hoek = require('hoek');


// Declare internals

const internals = {};


// Test shortcuts

const lab = exports.lab = Lab.script();
const describe = lab.experiment;
const expect = Code.expect;
const it = lab.test;


describe('/home', () => {

    it('returns home page containing relative path from root to home template', (done) => {

        University.init(internals.manifest, internals.composeOptions, (err, server) => {

            expect(err).to.not.exist();

            const request = {
                method: 'GET',
                url: '/home'
            };
            server.inject(request, (res) => {

                expect(res.statusCode, 'Status code').to.equal(200);
                expect(res.result, 'result').to.equal(Path.relative(Path.resolve('__dirname', '../'), Path.resolve('__dirname', '../views/home.html')));

                server.stop(done);
            });
        });
    });

    it('errors on failed registering of vision', { parallel: false }, (done) => {

        const orig = Vision.register;

        Vision.register = function (plugin, options, next) {

            Vision.register = orig;
            return next(new Error('fail'));
        };

        Vision.register.attributes = {
            name: 'fake vision'
        };

        University.init(internals.manifest, internals.composeOptions, (err) => {

            expect(err).to.exist();

            done();
        });
    });

    it('errors on missing vision plugin', (done) => {

        const manifest = Hoek.clone(internals.manifest);
        manifest.registrations.splice(1, 1);

        University.init(manifest, internals.composeOptions, (err, server) => {

            expect(err).to.exist();
            expect(err.message).to.equal('Plugin ' + Home.register.attributes.name + ' missing dependency ' + Vision.register.attributes.pkg.name +
                                         ' in connection: ' + server.info.uri);

            done();
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
            plugin: './home'
        },
        {
            plugin: 'vision'
        }
    ]
};

internals.composeOptions = {
    relativeTo: Path.resolve(__dirname, '../lib')
};
