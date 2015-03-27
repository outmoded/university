var Lab = require('lab');
var Code = require('code');
var Server = require('../lib');


var lab = exports.lab = Lab.script();
var expect = Code.expect;

lab.experiment('Version Plugin', function () {

    lab.test('server returns plugin version', function (done) {

        Server.init(null, function (err, server) {

            var request = {
                method: 'GET',
                url: '/version'
            };

            server.inject(request, function (res) {

                expect(res.result).to.exist();
                expect(res.result).to.equal({ 'version': '0.0.3' });
                server.stop(done);
            });
        });
    });
});
