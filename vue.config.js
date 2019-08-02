const path = require('path')
const I18nCombineWebpackPlugin = require('i18n-combine-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  publicPath: process.env.VUE_APP_BASE_URL,
  
  configureWebpack: () => {
    const config = {
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
    }

    if (process.env.NODE_ENV === 'production') {
      Object.assign(config, {
        optimization: {
          minimizer: [
            new TerserPlugin({
              terserOptions: {
                compress: {
                  warnings: true,
                  drop_debugger: true,
                  drop_console: true
                }
              }
            })
          ]
        }
      })
    }

    return config
  },

  chainWebpack: config => {
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
    port: 8080,
    open: true,
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
