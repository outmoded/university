var Code = require('code');
var Lab = require('lab');
var Server = require('../lib');
var Version = require('../lib/version');

var expect = Code.expect;
var labi = exports.lab = Lab.script();

labi.experiment('index', function(){

    labi.test('init starts the server', function(done){

        Server.init(8081, function(err, server){
            expect(err).to.be.undefined();
            expect(server).to.be.an.object();
            server.stop(done);
        });
    });

    labi.test('no port supplied', function(done){

        Server.init(function(err, server){

            expect(server.info.port).to.be.equal(8000);
            expect(err).to.be.undefined();
            server.stop(done);
        });
    });

    labi.test('should report error if plugin registration fails', function(done){

        var correctVersionPlugin = Version.register;
        var fakePluginError = 'Fake Plugin Error';
        Version.register = function(server, options, next){

            return next(fakePluginError);
        };
        Version.register.attributes = {name: 'Fake version Plugin' };

        Server.init(8081, function(err, server){

            Version.register = correctVersionPlugin;
            expect(err).to.be.equal(fakePluginError);
            server.stop(done);
        });
    });
});
