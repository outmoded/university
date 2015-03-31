var Code = require('code');
var Lab = require('lab');
var Hapi = require('hapi');
var Index = require('../lib/index');

var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var expect = Code.expect;


describe('index', function() {
    it('listens on port', function(done) {

        Index.init(8000, function(err, server) {

            expect(server.info.port).to.equal(8000);
            server.stop();
            done();
        });
    });
});
