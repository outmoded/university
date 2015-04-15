// Load modules

var Code = require('code');
var Lab = require('lab');
var Index = require('../lib');
var Version = require('../lib/version');

var internals = {
  port: 3000
};

var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var expect = Code.expect;


describe('server', function() {

  it('Should return server object', function (done) {

        Index.init(function (err, server) {

          expect(err).to.be.undefined();
          expect(server).to.exist();
          server.stop(done);

        });
  });

  it('Should return on failed plugin load', function (done) {

        var register = Version.register;

        Version.register = function (server, options, next) {

           return next('Fatal');
        };

        Version.register.attributes = {
           name: 'Error name'
        };

         Index.init(null, function(err, server) {

               expect(err).to.equal('Fatal');
               expect(server).to.not.exist();

               Version.register = register;

               done();
         });


  });

  it('Should return a server on a different port', function (done) {

         var port = 6000;

         Index.init(port, function (err, server) {

             expect(err).to.not.exist();
             expect(server.info.port).to.equal(port);

             server.stop(done);
         });
     });

});
