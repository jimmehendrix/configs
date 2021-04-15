module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: ['plugin:vue/recommended', 'eslint:recommended'],
    parserOptions: {
        parser: 'babel-eslint',
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'vue/match-component-file-name': [
            'error',
            {
                extensions: ['vue'],
                shouldMatchCase: true,
            },
        ],
        'vue/component-definition-name-casing': ['error', 'PascalCase'],
        'vue/component-name-in-template-casing': [
            'error',
            'PascalCase',
            {
                registeredComponentsOnly: true,
                ignores: [],
            },
        ],
    },
};
