var internals = {};


exports.register = function (server, options, next) {

    // @question is this the best way to pass the error message?
    // Most likely there is a better way.
    var errorMessage = false;

    server.register({ register: require('crumb'), options: { cookieOptions: { isSecure: true } } }, function (err) {

        if (err) {

            // return next(new Error('fail'));
            errorMessage = new Error('fail');
        }
    });

    return next(errorMessage);
};

exports.register.attributes = {
        name: 'Crummy'
};
