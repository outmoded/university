// Load modules
var Code = require('code');
var Hapi = require('hapi');
var Hoek = require('hoek');
var Lab = require('lab');
var Version = require('../lib/version');
var Init = require('../lib/index').init;

// Declare internals

var internals = {};


// Test shortcuts

var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var expect = Code.expect;


describe('Version endpoint', function () {

    it('replies with the version', function (done) {

        var options = {
            method: 'GET',
            url: '/version'
        };

        Init(8000, function (errors, server) {

            server.inject(options, function (res) {

                expect(res.result, 'Response').to.be.an.object();
                expect(res.result, 'Response').to.include('version');
                server.stop();
                done();
            });

        });

    });

});
