'use strict';

var Code = require('code');
var Lab = require('lab');

var Index = require('../lib/index');
var Version = require('../lib/version');

var lab = exports.lab = Lab.script();
var describe = lab.describe;
var expect = Code.expect;
var it = lab.it;

describe('index.js', function() {

    var server;

    it('Should not require port to start on default port', function(done) {

        Index.init(function(err, server) {

            expect(err).to.be.undefined();
            expect(server).to.be.object();
            expect(server.info.port).to.equal(8000);
            server.stop(done);
        });
    });

    it('Should start server correctly on port 5000', function(done) {

        Index.init(5000, function(err, server) {

            expect(err).to.be.undefined();
            expect(server).to.be.object();
            expect(server.info.port).to.equal(5000);
            server.stop(done);
        });
    });

    //Peeked at other people's solution
    it('Should report error when plugin registration fails', function(done) {

        var register = Version.register;

        Version.register = function(server, options, next) {

            next('An error');
        };

        Version.register.attributes = {
            name: 'An error'
        };

        Index.init(8000, function(err, server) {

            expect(err).to.be.equal('An error');
            expect(server).to.be.object();
            expect(server.info.port).to.equal(8000);

            Version.register = register;

            server.stop(done);
        });
    });
});
