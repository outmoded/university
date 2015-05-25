var Hapi = require('hapi');
var Code = require('code');
var Lab = require('lab');
var Composer = require('../lib/start');


// Test shortcuts

var lab = exports.lab = Lab.script();
var expect = Code.expect;
var it = lab.test;

it('starts server and returns hapi server object', function (done) {

    Composer(function (err, composedServer) {

            expect(composedServer).to.be.an.object();
            done();
        });
}); 


                       
                       
    
                       
    

        







