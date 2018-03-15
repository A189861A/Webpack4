const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const webpackBaseConf = require('./webpack.base.conf')

const HOST = 'localhost'
const PORT = 8080

const webpackDevConf = {
  mode: 'development',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name].js',
    publicPath: '/'
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    inline: true,
    contentBase: false,
    host: HOST,
    port: PORT,
    open: true,
    hot: true,
    overlay: {
      warning: false,
      errors: true
    }
  },
  optimization: {
    noEmitOnErrors: true
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
}

module.exports = merge(webpackBaseConf, webpackDevConf)
