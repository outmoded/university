// Load modules

var Code = require('code');
var Lab = require('lab');
var Hapi = require('hapi');
var Version = require('../lib/version');
var Hoek = require('hoek');

var lab = exports.lab = Lab.script();

var internals = {
    server: new Hapi.Server()
};

lab.experiment('Version plugin', function () {
    
    lab.beforeEach(function (done) {

        internals.server.connection({ port:8000 });
        internals.server.register(Version, function (err) {

            Code.expect(err).to.not.exist();
            internals.server.start(function (err) {

                Code.expect(err).to.not.exist();
                console.log('Server started at: ' + internals.server.info.uri);
                done();
            });
        });
    });

    lab.test('it should return the current version', function (done) {

        internals.server.inject('/version', function (res) {
            
            Code.expect(res.result).to.be.an.object();
            done();
        });
    });

    lab.afterEach(function (done) {

        internals.server.stop()
        done();
    });
});