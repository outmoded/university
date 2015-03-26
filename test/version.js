var Lab = require('lab');
var lab = exports.lab = Lab.script();
var lib = require('../lib');
var Code = require('code');

var expect = Code.expect;


lab.test('Testing output on a valid url', function(done) {
    
    var options = {
        method: 'GET',
        url: '/version'
    };
    
    lib.init(function(err, server) {
        
        
    });
});