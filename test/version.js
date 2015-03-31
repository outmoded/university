'use strict';

var Code = require('code');
var Lab = require('lab');

var Index = require('../lib/index');
var Pkg = require('../package.json');

var lab = exports.lab = Lab.script();
var describe = lab.describe;
var expect = Code.expect;
var it = lab.it;

describe('version.js', function() {

    it('returns correct version', function(done) {

        Index.init(8000, function(err, server) {

            expect(err).to.be.undefined();
            expect(server).to.be.object();

            server.inject({
                method: 'GET',
                url: '/version'
            }, function(res) {

                var version = res.result.version;

                expect(res.statusCode).to.equal(200);
                expect(version).to.be.a.string().and.to.equal(Pkg.version);
                done();
            });
        });
    });
});
