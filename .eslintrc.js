module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'plugin:@typescript-eslint/recommended'
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-explicit-any': ['off'],
    '@typescript-eslint/no-empty-function': 'off',
    indent: ['error', 2],
    'linebreak-style': [0, 'error', 'window'],
    quotes: ['error', 'single'],
    semi: ['error', 'never']
  },
  globals: {}
}
