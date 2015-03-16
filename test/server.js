'use strict';
var Code = require('code');
var Lab = require('lab');

var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var before = lab.before;
var after = lab.after;
var expect = Code.expect;

describe('server', function() {

    it('should return a version', function(done) {

        var server = require('../lib/server');

        server.inject('/version', function(res) {

            expect(res.statusCode).to.equal(200);
            expect(server.info.port).to.equal(8000);
            expect(res.payload).to.equal('{"versions":"0.0.1"}');
            done();
        });
    });

});
