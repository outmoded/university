// Load modules

var Code = require('code');
var Lab = require('lab');
var Path = require('path');
var University = require('../lib');


// Declare internals

var internals = {};
internals.defaultServer = {
    connections: [
        {
            port: 0
        }
    ]
};


// Test shortcuts

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;



describe('/home', function (){

    it('returns the relative path to home.html from /home', function (done) {

        University.init(internals.defaultServer, function (err, server) {

            expect(err).to.not.exist();

            server.inject('/home', function (res) {

                expect(res.statusCode).to.equal(200);
                expect(res.result).to.contain(Path.relative('./', 'views/home.html'));

                server.stop(done);
            });
        });
    });
});
