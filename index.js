var server = module.exports = require('./lib/server');

if (!module.parent) {
    server.start(function (error) {
        if (error) {
            console.error('Error starting server');
            throw error;
        }
        console.log('Server running at:', server.info.uri);
    });
}
