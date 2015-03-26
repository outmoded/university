
//Load modules

var Code = require('code');
var Lab = require('lab');
var Server = require('../lib');


// Test shortcuts

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var it = lab.test;
var expect = Code.expect;


describe('Server', function() {

    it('Run on 5000', function(done){

        Server.init(5000, function(err, server){

            expect(server.info.port).to.equal(5000);
            server.stop();
        });

        done();
    });


    it('Default Run on 8000', function(done){

        Server.init(null, function(err, server){

            expect(server.info.port).to.equal(8000);
            server.stop();
        });

        done();
    });


    it('Default Run on 8899', function(done){

        Server.init(8899, function(err, server){

            expect(server.info.port).to.equal(8899);
            server.stop();
        });
        done();
    });
});

