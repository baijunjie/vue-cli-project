const path = require('path')
const I18nCombineWebpackPlugin = require('i18n-combine-webpack-plugin')

module.exports = {
  configureWebpack: {
    plugins: [
      new I18nCombineWebpackPlugin({
        src: path.join(__dirname, './src/**/ja.json'),
        dist: path.join(__dirname, './public/data/i18n'),
        autoMerge: {
          target: 'ja.json',
          files: [
            'en.json',
            'zh-CN.json',
            'zh-TW.json'
          ],
          safeMode: true
        }
      })
    ]
  },

  chainWebpack: (config) => {
    // use 'yarn link' => Error: No ESLint configuration found.
    // https://github.com/vuejs/vue-cli/issues/2793
    config.resolve.set('symlinks', false)
  },

  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },

  devServer: {
    proxy: {
      '^/api': {
        target: process.env.VUE_APP_API_URL,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
