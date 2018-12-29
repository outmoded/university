'use strict';

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
        'password': 'bar',
        'email': 'bar@hapiu.com',
        'scope': ['user']
    }
];

exports.authenticate = (username, password) => {

    for (const userRecord of internals.db) {

        if (userRecord.username === username) {

            // valid username

            if (userRecord.password === password) {

                delete userRecord.password;

                // authentic user credentials

                const authenticUserRecord = { authentic: true, userRecord };
                return authenticUserRecord;
            }

            const authenticUserRecord = { authentic: false, userRecord: null };
            return authenticUserRecord;
        }
    }

    const authenticUserRecord = { authentic: false, userRecord: null };
    return authenticUserRecord;
};
