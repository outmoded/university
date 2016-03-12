'use strict';

// Declare internals

const internals = {};

exports.register = (server, options, next) =>  {

    // When crumb is configured with the restful option as true (as done below),
    // All POST, PUT, DELETE, OR PATCH requests require a valid crumb to be loaded in headers.
    //
    // To build client-side AJAX requests the x-csrf-token must be set using client side
    // JavaScript before making an AJAX request.
    // See Example: ./assets/scripts/login.js
    //   * Pay attention to internals.executeAJAX() logic, note how the 'x-csrf-token': crumb value is set.
    //   * This shows how to build the AJAX request in the browser which differs from requests made in tests.
    //   * The browser handles crumb and hapi-auth-cookie cookie management for us.
    //
    // To build requests for testing, crumb and hapi-auth-cookie cookie values must both be loaded into each request.
    // Each test request must have the following headers:
    // 1. crumb related headers to be set:
    //    *  'x-csrf-token' is the crumb value
    //    *  headers.cookies must contain 'crumb=crumbCookieValue;'
    // 2. hapi-auth-cookie headers (required if user already authenticated/logged in):
    //    * headers.cookie: 'sid-example=sessionCookieValue'
    // See ./test/api/user.js for examples of how to build test requests with headers configured properly.

    const configs = {
        restful: true,
        cookieOptions: { isSecure: true }
    };

    server.register({ register: require('crumb'), options: configs }, (err) => {

        if (err) {
            return next(err);
        }

        return next();
    });
};

exports.register.attributes = {
    name: 'Crumbit'
};
