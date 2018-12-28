'use strict';


exports.handler = function (request, h) {

    // Notice how request.server.app properties are exposed in
    // the routes request object. Use this feature to expose things
    // like DB connections throughout the application

    const response = {
        version: request.server.app.version,
        message: request.server.app.message
    };

    return response;
};
