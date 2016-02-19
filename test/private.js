'use strict';

// Load modules

const Code = require('code');
const Lab = require('lab');
const University = require('../lib');
const Users = require('../lib/users.json');
const Basic = require('hapi-auth-basic');


// Declare internals

const internals = {};


// Test shortcuts

const lab = exports.lab = Lab.script();
const describe = lab.experiment;
const expect = Code.expect;
const it = lab.test;


describe('/private', () => {

    it('returns a greeting for the authenticated user', (done) => {

        University.init(0, (err, server) => {

            expect(err).to.not.exist();

            const request = { method: 'GET', url: '/private', headers: { authorization: internals.header('foo', Users.foo.password) } };
            server.inject(request, (res) => {

                expect(res.statusCode, 'Status Code').to.equal(200);
                expect(res.result, 'result').to.equal('<div>Hello foo</div>');

                server.stop(done);
            });
        });
    });

    it('errors on wrong password', (done) => {

        University.init(0, (err, server) => {

            expect(err).to.not.exist();

            const request = { method: 'GET', url: '/private', headers: { authorization: internals.header('foo', '') } };
            server.inject(request, (res) => {

                expect(res.statusCode, 'Status code').to.equal(401);

                server.stop(done);
            });
        });
    });

    it('errors on failed auth', (done) => {

        University.init(0, (err, server) => {

            expect(err).to.not.exist();

            const request = { method: 'GET', url: '/private', headers: { authorization: internals.header('I do not exist', '') } };
            server.inject(request, (res) => {

                expect(res.statusCode, 'Status code').to.equal(401);

                server.stop(done);
            });
        });
    });

    it('errors on failed registering of auth', { parallel: false }, (done) => {

        const orig = Basic.register;

        Basic.register = function (plugin, options, next) {

            Basic.register = orig;
            return next(new Error('fail'));
        };

        Basic.register.attributes = {
            name: 'fake hapi-auth-basic'
        };

        University.init(0, (err) => {

            expect(err).to.exist();

            done();
        });
    });
});


internals.header = function (username, password) {

    return 'Basic ' + (new Buffer(username + ':' + password, 'utf8')).toString('base64');
};
