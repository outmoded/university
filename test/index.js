var Version = require('../lib/version');
var Index = require('../lib/index');
var Code = require('code');
var Lab = require('lab');
var lab = exports.lab = Lab.script();

var describe = lab.describe;
var it = lab.it;
var before = lab.before;
var after = lab.after;
var expect = Code.expect;

describe('Index', function () {

    it('successfully starts', function(done) {

        Index.init(null, function(err, server) {

            expect(err).to.not.exist();
            server.stop(done);
        });
    });

    it('fails to starts', { parallel: false }, function(done) {

        var register = Version.register;
        Version.register = function (server, options, next) {

            return next(new Error());
        };
        Version.register.attributes = {
            name: 'test'
        };

        Index.init(null, function (err, server) {

            expect(err).to.exist();
            Version.register = register;
            server.stop(done);
        });

    });
});
