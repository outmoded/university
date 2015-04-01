var Code = require('code');
var Lab = require('lab');
var Server = require('../lib/index');
var Pkg = require('../package.json');

var lab = exports.lab = Lab.script();
var expect = Code.expect;
var describe = lab.experiment;
var it = lab.test;

describe('Testing the Version plugin', function() {

    it('Returns the server version', function(done) {

        Server.init(null, function(err, server) {

            server.inject('/version', function(response) {

                expect(response.statusCode).to.equal(200);
                expect(response.result).to.deep.equal({ version: Pkg.version });
                server.stop(done);
            });
        });
    });
});
