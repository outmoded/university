var pkg = require('../package.json');

var internals = {
    version: pkg.version
};

module.exports = [
    {
        method: 'GET',
        path: '/version',
        config: {
            handler: function (request, reply) {

                return reply({version: internals.version});
            }
        }
    }
];
