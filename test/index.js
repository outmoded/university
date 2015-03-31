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


describe('Check server startup',function(){

    it('test port 5000', function(done){

        Server.init(5000, function(err, server){

            expect(server.info.port).to.equal(5000);

            server.stop(done);
        });
    });


    it('test no port submitted', function(done){

        Server.init(function(err, server){

            expect(server.info.port).to.equal(8000);

            server.stop(done);
        });
    });


    it('test version plugin load fail', function(done){

        var register = Version.register;

        // Credit: Break plugin code based on  @TheAlphaNerd's assignment3.
        Version.register = function (server, options, next) {

            next('Break plugin');
        };


        Version.register.attributes = {
            name: 'Fakey Mc Fakerson'
        }; 


        Server.init(function(err, server){
        
            expect(err).to.equal('Break plugin');


            expect(server.info.port).to.equal(8000);


            Version.register = register;


            server.stop(done);
        });
    });
});



