var Code = require('code');
var Lab = require('lab');
var Package = require('../package.json');
var lab = exports.lab = Lab.script();
var lib = require('../lib/');

lab.test('returns true when 1 + 1 equals 2', function (done) {

    Code.expect(1 + 1).to.equal(2);
    done();
});


lab.test('it returns the version', function (done) {

    var options = {
        method: 'GET',
        url: '/version'
    };



    server.inject(options, function (response) {

        var result = response.result;
        //console.log(result);

        Code.expect(response.statusCode).to.equal(200);

    });
});
