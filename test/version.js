const Univesity = require('../lib');
const Package = require('../package.json');
const Code = require('code');
const Lab = require('lab');
const lab = exports.lab = Lab.script();


const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;

describe('/version', () => {

    it('returns a correct verion from pakage.json', (done) => {

        Univesity.init(0, (err, server) => {

            expect(err).to.not.exist();

            server.inject('/version', (res) => {

                expect(res.statusCode).to.equal(200);
                expect(res.result).to.deep.equal({ version: Package.version });

                server.stop(done);
            });
        });
    });
});
