// const CompressionWebpackPlugin = require('compression-webpack-plugin')
// const path = require('path')
// const PrerenderSpaPlugin = require('prerender-spa-plugin')

const Timestamp = new Date().getTime()

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/styles/variables.scss";
        `
      }
    }
  },
  configureWebpack: {
    output: {
      filename: `[name].${Timestamp}.js`,
      chunkFilename: `[name].${Timestamp}.js`
    }
  },
  lintOnSave: 'warning',
  productionSourceMap: false

}
