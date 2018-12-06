module.exports = {
  root: true,
  globals: {
    PROJECT_ENV: true,
    PROJECT_VERSION: true
  },
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    // 'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-callback-literal': 0,
    'no-tabs': 0
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
