'use strict';

// Load modules

const Code = require('code');
const Lab = require('lab');
const University = require('../lib');
const Path = require('path');

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

            const request = { method: 'GET', url: '/home' };

            server.inject(request, (res) => {

                expect(res.statusCode, 'Status code').to.equal(200);
                console.log(res.result);
                expect(res.result).to.equal(Path.relative(Path.resolve('__dirname', '../'), Path.resolve('__dirname', '../views/home.html\n')));

                server.stop(done);
            });
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
            plugin: {
                register: './home',
                options: {}
            }
        },
        {
            plugin: {
                register: 'vision',
                options: {}
            }
        },
        {
            plugin: {
                register: 'inert',
                options: {}
            }
        }
    ]
};


internals.composeOptions = {
    relativeTo: Path.resolve(__dirname, '../lib')
};
