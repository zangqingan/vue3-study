/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      // 非 react 项目关闭 jsx 语法校验,默认为 true
      jsx: false,
    },
  },
  // 自定义校验规则
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true, // 使用单引号
        parser: 'flow',
        semi: false, // 不用分号结尾
        wrapAttributes: false, // 不用属性独占一行
        endOfLine: 'auto',
      },
    ],
  },
}
