module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    '@vue/typescript/recommended',
    '@vue/prettier',
    '@vue/prettier/@typescript-eslint',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  plugins: [],
  rules: {
    'vue/html-button-has-type': [
      'error',
      { button: true, submit: true, reset: true },
    ],
    'vue/match-component-file-name': ['error', { shouldMatchCase: false }],
    'vue/no-reserved-component-names': [
      'error',
      { disallowVue3BuiltInComponents: true },
    ],
  },
};
