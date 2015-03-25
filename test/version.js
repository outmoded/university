var Lab = require('lab');
var lab = exports.lab = Lab.script();
var server = require('../lib/index.js');
var Code = require('code');

var expect = Code.expect;


lab.test('Testing output on a valid url', function(done) {
    var options = {
        method: 'GET',
        url: '/version'
    };

    server.inject(options, function(response) {
        var result = response.result;

        expect(response.statusCode).to.equal(200);
        expect(result.version).to.equal('0.0.2');

        done();
    });
});

lab.test('Testing output on a non - valid url', function(done) {
    var options = {
        method: 'GET',
        url: '/wrong'
    };

    server.inject(options, function(response) {
        var result = response.result;

        expect(response.statusCode).to.equal(404);

        done();
    });
});

