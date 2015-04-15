//Load modules

var Code = require('code');
var Lab = require('lab');
var Lib = require('../lib');
var Version = require('../lib/version');


// Test shortcuts

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var it = lab.test;
var expect = Code.expect;


describe('Check server startup',function(){

    it('test server created', function(done){

        Lib.init(0, function(err, server){

            expect(server.info.port).to.be.above(0);
            server.stop(done);
        });
    });


    it('test server missing port argument', function(done){

        Lib.init(function(err, server){

            expect(err.message).to.equal('Error no port submitted');
            server.stop(done);
        });
    });


    it('test server port is not valid number', function(done){

        Lib.init('port not number', function(err, server){

            expect(err.message).to.equal('Error port is not valid number');
            server.stop(done);
        });
    });


    it('test version plugin load fail', { parallel: false }, function(done){

        var register = Version.register;

        // Credit: Break plugin code based on  @TheAlphaNerd's assignment3.
        Version.register = function (server, options, next) {

            // next('Break plugin');
            return next(new Error('Boom Error'));
        };


        Version.register.attributes = {
            name: 'Fakey Mc Fakerson'
        }; 


        Lib.init(0, function(err, server){
        
            expect(err.message).to.equal('Boom Error');
            Version.register = register;
            server.stop(done);
        });
    });
});



