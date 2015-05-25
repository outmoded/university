// Load modules

var Hapi = require('hapi');
var Code = require('code');
var Lab = require('lab');
var University = require('../lib');
var Version = require('../lib/version');
var Path = require('path');

//declare internals

var internals = {};

// Test shortcuts

var lab = exports.lab = Lab.script();
var expect = Code.expect;
var it = lab.test;



it('returns the path', function (done) {

    University.init(internals.manifest, internals.composeOptions, function (err, server) {

        expect(err).to.not.exist();

        var request = { method: 'GET', url: '/home' };
        server.inject(request, function (res) {

            expect(res.statusCode, 'Status code').to.equal(200);
            expect(res.result, 'result').to.equal('views/home.html\n');

            server.stop(done);
        });
    });
});

internals.manifest = {
    connections: [
        {
            port: 0
        }
    ],
    plugins: {
        './home': {}
    }
};

internals.composeOptions = {
    relativeTo: Path.resolve(__dirname, '../lib')
};
