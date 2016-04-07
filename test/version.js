const Init = require('../lib/index');
const Code = require('code');
const Lab = require('lab');
const lab = exports.lab = Lab.script();

const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;

describe('version', () => {

    it('returns a correct verion from pakage.json', (done) => {

        Init(0, (err, server) => {

        });

        done();
    });
});
