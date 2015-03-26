
//Load modules

var Code = require('code');
var Lab = require('lab');
var Server = require('../lib');
var Hoek = require('hoek');


// Test shortcuts

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var it = lab.test;
var expect = Code.expect;


describe('Server', function() {

    it('Run on 5000', function(done){

         Server.init(5000, function(err, server){

            // Hoek or expect undefined ??? best practices are what ??
            // Hoek.assert(!err, err); ?? Hoek or below ?? 
            expect(err).to.be.undefined();

            expect(server.info.port).to.equal(5000);

            server.stop(done);
        });
    });


    lab.test('Run on 7000', function(done){

         Server.init(7000, function(err, server){

            Hoek.assert(!err, err);

            expect(server.info.port).to.equal(7000);

            server.stop(done);
        });
    });


    it('Default Run on 8000', function(done){

        Server.init(null, function(err, server){

            expect(err).to.be.undefined();

            expect(server.info.port).to.equal(8000);
            
            server.stop(done());
        });
    });


    it('Default Run on 8899', function(done){

        Server.init(8899, function(err, server){

            Hoek.assert(!err, err);

            expect(server.info.port).to.equal(8899);

            server.stop(done);
        });
    });
});

