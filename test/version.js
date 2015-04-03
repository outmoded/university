var Code = require('code');
var Lab = require('lab');
var Server = require('../lib');
var Pkg = require('../package.json');

var expect = Code.expect;
var labi = exports.lab = Lab.script();

labi.experiment('Version:', function() {
	labi.test('returns correct version', function(done) {

		Server.init(8000, function(err, server) {

			var options = {
				url: '/version'
			};
			server.inject(options, function(res) {

				expect(res.result).to.be.an.object();
				expect(res.result.version).to.deep.equal(Pkg.version);
				server.stop(done);
			});
		});
	});
});