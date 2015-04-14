// Load modules

var Code = require('code');
var Lab = require('lab');
var Package = require('../package.json');
var lib = require('../lib/');

// Declare internals

var internals = {};

// Test shortcuts
var lab = exports.lab = Lab.script();
var expect = Code.expect;


lab.test('it returns the version', function (done) {

    var options = {
        method: 'GET',
        url: '/version'
    };

    lib.init(function (err, server) {

        expect(err).to.be.undefined();
        expect(server.info.port).to.equal(8000);
        server.inject(options, function (response) {

            expect(response.statusCode).to.equal(200);
            expect(response.result.version).to.equal(Package.version);
            server.stop(done);
        });
    });
});
