var Code = require('code');
var Lab = require('lab');
var University = require('../lib');
var Path = require('path');
var Config = require('../lib/config');
var Good = require('good');

// Declare internals

var internals = {};


// Test shortcuts

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;


describe('good', function () {

    it('monitor registration failed', { parallel: false }, function (done) {

        var orig = Good.register;

        Good.register = function (plugin, options, next) {

            Good.register = orig;
            return next(new Error('fail'));
        };

        Good.register.attributes = {
            name: 'fake good'
        };

        University.init(internals.manifest, internals.composeOptions, function (err, server) {

            expect(err).to.exist();
            expect(err.message).to.equal('fail');
            done();
        });
    });
});

internals.manifest = {
    connections: [
        {
            host: 'localhost',
            port: 0,
            labels: ['web']
        },
        {
            host: 'localhost',
            port: 0,
            labels: ['web-tls', 'api'],
            tls: Config.tls
        }
    ],
    plugins: {
        'good': Config.monitor
    }
};

internals.composeOptions = {
    relativeTo: Path.resolve(__dirname, '../lib')
};
