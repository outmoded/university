'use strict';

// Declare internals

const internals = {};

exports.register = (server, options, next) =>  {

    server.register({ register: require('good'), options: internals.options }, (err) => {

        if (err) {
            return next(err);
        }

        return next();
    });
};

exports.register.attributes = {
    name: 'Good'
};

exports.options = internals.options = {
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
            args: ['./test/fixtures/awesomeLog']
        }]
    }
};

// exports.options = internals.options = {
//     opsInterval: 1000,
//     filter:{
//         access_token: 'censor'
//     },
//     reporters: [{
//         reporter: require('good-console'),
//         events: { log: '*', response: '*' }
//     }, {
//         reporter: require('good-file'),
//         events: { ops: '*' },
//         config: './test/fixtures/awesomeLog'
//     }]
// };
