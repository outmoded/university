'use strict';

const Code = require('code');
const Lab = require('lab');
const Server = require('../lib/index');

const lab = exports.lab = Lab.script();
const expect = Code.expect;

lab.experiment('hapijs_uni', () => {

    lab.test('Get /version should return 200 and current project version', (done) => {

        const options = {
            method: 'GET',
            url: '/version'
        };

        Server.inject(options, (response) => {

            const result = response.result;

            expect(response.statusCode).to.equal(200);
            expect(result.version).to.equal('0.0.1');
            done();
        });
    });
});
