
//Load modules

var Code = require('code');
var Lab = require('lab');
var Server = require('../lib');
var Hoek = require('hoek');
var lib = require('../lib');


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


    it('Failed ot load plugin test', function(done){

        // Test logic taken from @TheAlphaNerd assignment3
        var register = lib.Version.register;

        lib.Version.register = function (server, options, next) {
            next('I like to break stuff');
        };

        lib.Version.register.attributes = {
            name: 'Fakey Mc Fakerson'
        };

         Server.init(5000, function(err, server){

             expect(err).to.equal('I like to break stuff');
            // Hoek or expect undefined ??? best practices are what ??
            // Hoek.assert(!err, err); ?? Hoek or below ?? 
            // expect(err).to.be.undefined();

            expect(server.info.port).to.equal(5000);

            lib.Version.register = register;

            server.stop(done);
        });
    });


    lab.test('Run on 7000', function(done){

         Server.init(7000, function(err, server){

            expect(err).to.be.undefined();

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

            expect(err).to.be.undefined();

            expect(server.info.port).to.equal(8899);

            server.stop(done);
        });
    });
});

