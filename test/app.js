'use strict';

var Lab = require('lab');
var Chai = require('chai');

var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var expect = Chai.expect;
var server = require('../lib');

describe('app', function() {

    it('should get the server version', function(done) {

        server.inject('/version', function(response) {

            expect(response.statusCode).to.equal(200);
            expect(response.result.version).to.equal('0.0.1');
            done();
        });
    });
});
