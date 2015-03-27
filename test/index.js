
//Load modules

var Code = require('code');
var Lab = require('lab');
var Server = require('../lib');
var Version = require('../lib/version');


// Test shortcuts

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var it = lab.test;
var expect = Code.expect;


describe('Server', function() {

    it('Run on 5000', function(done){

         Server.init(5000, function(err, server){

            expect(err).to.be.undefined();

            expect(server.info.port).to.equal(5000);

            server.stop(done);
        });
    });


    it('Load version plugin failed test', function(done){

        var register = Version.register;

        // Break version plugin logic mostly based on @TheAlphaNerd's assignment3.
        Version.register = function (server, options, next) {
            next('Break the version plugin.');
        };


        Version.register.attributes = {
            name: 'Fakey Mc Fakerson'
        }; 


        Server.init(5000, function(err, server){

            expect(err).to.equal('Break the version plugin.');


            expect(server.info.port).to.equal(5000);


            Version.register = register;


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

