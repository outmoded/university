var Code = require('code');
var Lab = require('lab');
var Server = require('../lib');
var Version = require('../lib/version');
var Package = require('../package.json');


var internals = {
    port: 8000
};


var lab = exports.lab = Lab.script();
var expect = Code.expect;
var describe = lab.describe;
var it = lab.it;

describe('Endpoint', function () {

    it('test version endpoint', function (done) {

        Server(internals.port, function(err, server) {

            expect(server.info.port).to.equal(internals.port);

            server.inject('/version', function (response) {

                expect(response.statusCode).to.equal(200);

                expect(response.result.version).to.equal(Package.version);

                server.stop(done);
            });
        });
    });
});
