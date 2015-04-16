// Load modules

var Code = require('code');
var Index = require('../lib');
var Lab = require('lab');
var Version = require('../lib/version');


// Test shortcuts

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var it = lab.it;
var expect = Code.expect;

describe('Server', function () {

    it('listens on supplied port', function (done) {

        Index.init(8000, function (err, server) {

            expect(err).to.not.exist();
            expect(server.info.port).to.equal(8000);
            server.stop(done);
        });
    });

    it('registers version plugin', function (done) {

        Index.init(8000, function (err, server) {

            expect(err).to.not.exist();
            var routes = server.connections[0].table();
            var foundVersion = false;
            routes.forEach(function (route) {
                if (route.path === '/version') {
                    foundVersion = true;
                }
            });
            expect(foundVersion, 'version route not found').to.equal(true);
            server.stop(done);
        });
    });

    it({ parallel: false }, 'reports plugin registration error', function (done) {

        var register = Version.register;
        Version.register = function (server, options, next) {

            return next(new Error());
        };
        Version.register.attributes = {
            name: 'test'
        };

        Index.init(8000, function (err, server) {

            expect(err).to.exist();
            Version.register = register;
            server.stop(done);
        });
    });

});
