
var compose = module.exports = {};


compose.manifest = {
    'server': {},
    'connections': [
        {
            'port': 8000
        }
    ],
    'plugins': {
        './version': {},
        './private': {},
        './home': {}
    }
};

compose.options = {
    relativeTo: __dirname
};
