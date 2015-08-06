// Load modules

var Code = require('code');
var Lab = require('lab');
var University = require('../lib');
var Cookie = require('hapi-auth-cookie');
var Path = require('path');
var Hoek = require('hoek');

// Declare internals

var internals = {};


// Test shortcuts

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;

describe('/auth-basic', function () {

    it('errors on failed registering of hapi-auth-cookie', { parallel: false }, function (done) {

        var orig = Cookie.register;

        Cookie.register = function (plugin, options, next) {

            Cookie.register = orig;
            return next(new Error('fail'));
        };

        Cookie.register.attributes = {
            name: 'fake hapi-auth-cookie'
        };

        University.init(internals.manifest, internals.composeOptions, function (err) {

            expect(err).to.exist();
            done();
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
        './auth-cookie': {},
        'hapi-auth-cookie': {}
    }
};

internals.composeOptions = {
    relativeTo: Path.resolve(__dirname, '../lib')
};
