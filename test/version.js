var Code = require('code');
var Lab = require('lab');
var Hapi = require('hapi');
var server = new Hapi.Server();
var Version = require('../lib/version');
var Hoek = require('hoek');

var lab = exports.lab = Lab.script();

lab.experiment('', function () {
    
    lab.beforeEach(function (done) {

        server.connection({ port:8000 });
        server.register(Version, function (err) {

            Hoek.assert(!err, err);
            server.start(function (err) {

                Hoek.assert(!err, err);
                console.log('Server started at: ' + server.info.uri);
            });
        });
        done();
    });

    lab.test('', function (done) {

        server.inject('/version', function (res) {
            
            console.log(res.result);
            Code.expect(res.result).to.deep.equal({ version: '0.0.2'});
            done();
        });
    });

    lab.afterEach(function (done) {

        server.stop()
        done();
    });

});