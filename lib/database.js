'use strict';

const Hoek = require('hoek');

// mock user database

const internals = {};

internals.db = [
    {
        'id': 1,
        'username': 'foofoo',
        'password': 'password',
        'email': 'foo@hapiu.com',
        'scope': ['admin', 'user']
    },
    {
        'id': 2,
        'username': 'barica',
        'password': 'barpassword',
        'email': 'bar@hapiu.com',
        'scope': ['user']
    }
];

exports.authenticate = (username, password) => {

    for (const userRecord of internals.db) {

        if (userRecord.username === username) {

            // valid username

            if (userRecord.password === password) {

                const clonedUser = Hoek.clone(userRecord);

                delete clonedUser.password;

                // authentic user credentials

                const authenticUserRecord = { authentic: true, userRecord: clonedUser };
                return authenticUserRecord;
            }

            const authenticUserRecord = { authentic: false, userRecord: null };
            return authenticUserRecord;
        }
    }

    const authenticUserRecord = { authentic: false, userRecord: null };
    return authenticUserRecord;
};
