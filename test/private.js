'use strict';

// Load modules

const Code = require('code');
const Lab = require('lab');
const Server = require('../lib');
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

    it('greets the logged in user', (done) => {

        Server.init(0, (err, server) => {

            expect(err).to.not.exist();

            const request = { method: 'GET', url: '/private', headers: { authorization: internals.header('joe', Users.joe.password) } };
            server.inject(request, (res) => {

                expect(res.statusCode).to.equal(200);
                expect(res.result).to.deep.equal('<div>Hi joe!</div>');

                server.stop(done);
            });
        });
    });

    it('returns an error for the wrong password', (done) => {

        Server.init(0, (err, server) => {

            expect(err).to.not.exist();

            const request = { method: 'GET', url: '/private', headers: { authorization: internals.header('joe', 'junk') } };
            server.inject(request, (res) => {

                expect(res.statusCode).to.equal(401);

                server.stop(done);
            });
        });
    });

    it('returns an error for an unrecognized user', (done) => {

        Server.init(0, (err, server) => {

            expect(err).to.not.exist();

            const request = { method: 'GET', url: '/private', headers: { authorization: internals.header('nobody', 'junk') } };
            server.inject(request, (res) => {

                expect(res.statusCode).to.equal(401);

                server.stop(done);
            });
        });
    });

    it('returns an error if it fails to register auth', { parallel: false }, (done) => {

        const orig = Basic.register;

        Basic.register = function (plugin, options, next) {

            Basic.register = orig;
            return next(new Error('register failed!'));
        };

        Basic.register.attributes = {
            name: 'fake hapi-auth-basic'
        };

        Server.init(0, (err, server) => {

            expect(err).to.exist();

            done();
        });

    });
});

internals.header = function (username, password) {

    return 'Basic ' + (new Buffer(username + ':' + password, 'utf8')).toString('base64');
};
