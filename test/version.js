var Code = require('code');   // assertion library
var Hoek = require('hoek');

var Lab = require('lab');
var lab = exports.lab = Lab.script();

var Server = require('../lib');

var internals = {
    response: {
        version: require('../package.json').version
    }
};


lab.test('test version endpoint', function (done) {

    Server.init(function(err, server) {

        Hoek.assert(!err, err);

        var options = {
            method: 'GET',
            url: '/version'
        };

        server.inject(options, function(response) {

            Code.expect(response.statusCode).to.be.equal(200);
            Code.expect(response.result.version).to.be.equal(internals.response.version);
            server.stop(done);
        });
    });
});
