module.exports = {
    "extends": "google",
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
            "double"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};