module.exports = {
  root: true,
  parser: 'typescript-eslint-parser',
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2018,
    ecmaFeatures: {
      jsx: true
    }
  },
  extends: ['standard', 'standard-react'],
  plugins: ['typescript'],
  rules: {
    // 由于解析器无法解析 Decorator 中的变量，因此关闭此规则
    "no-unused-vars": "off",
    'space-before-function-paren': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}
