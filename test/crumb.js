module.exports = function (server, callback) {

    server.select('web-tls').inject({ method: 'get', url: '/login' }, function (res) {

        callback(res.headers['set-cookie'][0].split('; ')[0].replace('crumb=', ''));
    });
};
