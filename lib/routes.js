var internals = {
    package: require('../package.json')
};

module.exports = [
    {
        method: 'GET',
        path: '/version',
        handler: function (request, reply) {
            reply({ version: internals.package.version });
        },
        config: {
            description: 'Returns the version of the server'
        }
    }
];
