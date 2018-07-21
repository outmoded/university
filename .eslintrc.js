module.exports = {
    "extends": "./node_modules/eslint-config-google/index.js",
    "parserOptions": {
      "ecmaVersion":2017
    },
    "env": {
        "browser": true,
        "node": true
    },

    "rules": {
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};
