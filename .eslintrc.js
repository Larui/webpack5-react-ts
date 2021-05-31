const eslintrc = {
    env: {
        browser: true,
        node: true,
        jasmine: true,
        jest: true,
        es6: true,
        jquery: true
    },
    parser: 'babel-eslint',
    parserOptions: {
        ecmaVersion: 6,
        ecmaFeatures: {
            jsx: true,
            experimentalObjectRestSpread: true,
        },
    },
    plugins: [
        'react',
        'babel',
    ],
    rules: {
        'react/prefer-es6-class': 2,
        'react/prefer-stateless-function': 2,
        'react/jsx-pascal-case': 2,
        'react/jsx-closing-bracket-location': 2,
        'react/jsx-curly-spacing': 2,
        'react/no-string-refs': 2,
        'react/wrap-multilines': 2,
        'react/self-closing-comp': 2,
        'react/jsx-no-bind': 0,
        'react/require-render-return': 2,
        'react/sort-comp': 2,
        'react/no-is-mounted': 2,
        'react/no-find-dom-node': 2,
        'react/react-in-jsx-scope': 2,
        "react/jsx-no-duplicate-props": 2,
        "react/jsx-uses-vars:": 2,

        'jsx-quotes': [2, "prefer-double"],
        "jsx-equals-spacing": [1, "always"],
        "jsx-curly-spacing": [1, "always"],
        "jsx-no-undef": 2,

        'no-multi-spaces': 2,
        // 'quotes': [2, 'single'],
        'eol-last': 1,
        'no-extra-semi': 2,
        'semi': 2
    },
};

module.exports = eslintrc;