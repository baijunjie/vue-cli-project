module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  setupFiles: [
    // './tests/unit/setup.js' // 测试环境全局预设文件
  ],
  transformIgnorePatterns: [
    'node_modules/(?!@bjj)' // 转换忽略除 @bjj 以外的所有模块
  ]
  // 设置 preset: '@vue/cli-plugin-unit-jest' 后，以下设置都可以省略
  // transform: {
  //   '^.+\\.vue$': 'vue-jest',
  //   '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
  //   '^.+\\.jsx?$': 'babel-jest'
  // },
  // moduleNameMapper: {
  //   '^@/(.*)$': '<rootDir>/src/$1'
  // },
  // snapshotSerializers: [
  //   'jest-serializer-vue'
  // ],
  // testMatch: [
  //   '**/tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)'
  // ],
  // testURL: 'http://localhost/',
  // watchPlugins: [
  //   'jest-watch-typeahead/filename',
  //   'jest-watch-typeahead/testname'
  // ]
}
