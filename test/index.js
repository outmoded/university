// Load modules
var Code = require('code');
var Hapi = require('hapi');
var Hoek = require('hoek');
var Lab = require('lab');
var Init = require('../lib/index').init;

// Declare internals

var internals = {};


// Test shortcuts

var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var expect = Code.expect;


describe('server initiaion', function () {

    it('initiate a server without errors', function (done) {
		Init(8000, function (errors, server) {

			expect(errors).to.only.include(undefined);
			server.stop();
			done();
		});

    });
});
