var internals = {};


exports.register = function (server, options, next) {

    var errorMessage = false;
    // , skip: internals.skip(request, reply)
    // skip for testing of logout
    server.register({ register: require('crumb'), options: { cookieOptions: { isSecure: true } } }, function (err) {

        if (err) {

            // return next(new Error('fail'));
            // throw err;
            errorMessage = new Error('fail');
        }
    });

    return next(errorMessage);
};

exports.register.attributes = {
        name: 'Crummy'
};
