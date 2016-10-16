'use strict';

// Load modules

const Hoek = require('hoek');
const Server = require('./index');
const Config = require('./config');


// Declare internals

const internals = {};

internals.goodFilePath = (() => {

    const env = process.env.NODE_ENV;
    const name = env ? 'good ' + env + '.log' : 'good.log';
    return './log/' + name;
})();

internals.manifest = {
    connections: [
        {
            host: 'localhost',
            port: 8000,
            labels: ['web']
        },
        {
            host: 'localhost',
            port: 8001,
            labels: ['web-tls'],
            tls: Config.tls
        }
    ],
    registrations: [
        {
            plugin: './version',
            options: {
                select: ['web', 'web-tls']
            }
        },
        {
            plugin: './private',
            options: {
                select: ['web', 'web-tls']
            }
        },
        {
            plugin: './home',
            options: {
                select: ['web-tls']
            }
        },
        {
            plugin: './api/user',
            options: {
                select: ['web-tls']
            }
        },
        {
            plugin: './auth'
        },
        {
            plugin: './auth-cookie',
            options: {
                select: ['web-tls']
            }
        },
        {
            plugin: {
                register: './crumbit',
                options: { // pluginOptions - passed as 'options' to plugin
                    restful: true,
                    cookieOptions: { isSecure: true }
                }
            },
            options: { // registerOptions - NOT passed to plugin; instead passed to Glue under the hood
                select: ['web-tls']
            }
        },
        {
            plugin: 'hapi-auth-basic'
        },
        {
            plugin: 'hapi-auth-cookie'
        },
        {
            plugin: 'vision'
        },
        {
            plugin: 'inert'
        },
        {
            plugin: {
                register: './good',
                options: {
                    ops: { interval: 1000 },
                    reporters: {
                        myConsoleReporter: [{
                            module: 'good-squeeze',
                            name: 'Squeeze',
                            args: [{ log: '*', response: '*' }]
                        }, {
                            module: 'good-console'
                        }, 'stdout'],
                        myFileReporter: [{
                            module: 'good-squeeze',
                            name: 'Squeeze',
                            args: [{ ops: '*' }]
                        }, {
                            module: 'good-squeeze',
                            name: 'SafeJson'
                        }, {
                            module: 'good-file',
                            args: [internals.goodFilePath]
                        }]
                    }

                }
            }
        },
        {
            plugin: './lout',
            options: {
                select: ['web-tls']
            }
        }
    ]
};

internals.composeOptions = {
    relativeTo: __dirname // NOTE: use `Path.resolve(process.cwd() 'lib')` when using babel/typescript/rollup
};

Server.init(internals.manifest, internals.composeOptions, (err, server) => {

    Hoek.assert(!err, err);

    const web = server.select('web');
    const webTls = server.select('web-tls');

    server.log('Web server started at: ' + web.info.uri);
    server.log('WebTLS server started at: ' + webTls.info.uri);
});
