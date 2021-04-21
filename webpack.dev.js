const resolve = require('path').resolve
const { merge } = require('webpack-merge')
const common = require('./webpack.common')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-cheap-source-map',
  cache: {
    type: 'filesystem',
    cacheDirectory: resolve('.cache'),
  },
  devServer: {
    hot: true,
    disableHostCheck: true,
    progress: true,
    stats: 'errors-only',
  },
})
