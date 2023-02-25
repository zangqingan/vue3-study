/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution")
module.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript",
    "@vue/eslint-config-prettier",
    ".eslintrc-auto-import" // 自动导入的api
  ],
  parserOptions: {
    ecmaVersion: "latest"
  },
  rules: {
    "prettier/prettier": [
      "error",
      {
        // 行尾不需要有分号
        semi: false,
        // 一行最多 120 字符
        printWidth: 100,
        wrapAttributes: false,
        // 是否使用单引号
        singleQuote: false,
        // 对象的 key 仅在必要时用引号
        quoteProps: "as-needed",
        // 大括号内的首尾需要空格
        bracketSpacing: true,
        // 禁止使用尾逗号
        trailingComma: "none",
        // 箭头函数，函数体一个参数的时候禁止使用括号
        arrowParens: "avoid"
      }
    ]
  }
}
