var Config = require('./config');

var internals = {};


exports.register = function (server, options, next) {

    server.register({ register: require('good'), options: Config.monitor }, function (err) {

        // @Hack
        // Is the required to have if err test logic? Or, is this OK?
        return next(err);
    });
};

exports.register.attributes = {
        name: 'Monitor'
};
