import Vue from 'vue'
import merge from 'lodash/merge'

const constantsFiles = require.context('@/views', true, /constants.js$/)
const constants = constantsFiles.keys().reduce((constants, constantsPath) => {
  const value = constantsFiles(constantsPath)
  constants = merge(constants, value.default)
  return constants
}, {})

Vue.prototype.$constants = constants
