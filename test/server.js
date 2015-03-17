'use strict';

var Lab = require('lab');
var Code = require('code');

var internals = {};

// Shortcuts

var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var expect = Code.expect;
var server = require('../lib');

describe('Server', function() {

    it('should get a version resource', function(done) {

        server.inject('/version', function(response) {

            expect(response.statusCode).to.equal(200);
            expect(response.result.version).to.equal('0.0.1');
            done();
        });
    });
});
