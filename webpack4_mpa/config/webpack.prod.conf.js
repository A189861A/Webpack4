const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const webpackBaseConf = require('./webpack.base.conf')

const webpackProdConf = {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name].[chunkhash:7].js',
    chunkFilename: 'js/[name].[chunkhash:7].js'
  },
  devtool: 'source-map',
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve(__dirname, '../')
    }),
    new UglifyJsPlugin({
      sourceMap: true,
      parallel: true
    })
  ]
}

module.exports = merge(webpackBaseConf, webpackProdConf)
