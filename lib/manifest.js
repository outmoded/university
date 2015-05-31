
var compose = module.exports = {};


compose.manifest = {
    'server': {},
    'connections': [
        {
            'port': 8000
        }
    ],
    'plugins': {
        './auth-basic': {},
        './home': {},
        './private': {},
        './version': {},
        'hapi-auth-basic': {}
    }
};

compose.options = {
    relativeTo: __dirname
};
