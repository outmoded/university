// Load modules

var Code = require('code');
var Lab = require('lab');
var Server = require('../lib');


// Test shortcuts

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;

lab.test('Give the version data of the package.json file ', function(done) {

    var options = {
        method: 'GET',
        url: '/version'
        };

    Server.init(5000, function (err, server) {

        server.inject(options, function(response) {

            var result = response.result;

            expect(response.statusCode).to.equal(200);
            expect(result.version).to.equal('0.0.2');

            done();
            });
        });
});
