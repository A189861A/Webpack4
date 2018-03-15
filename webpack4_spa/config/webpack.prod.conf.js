const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const webpackBaseConf = require('./webpack.base.conf')

const webpackProdConf = {
  // 指定为生产模式，也可以在命令行参数上设置
  mode: 'production',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name].[chunkhash:7].js',
    chunkFilename: 'js/[name].[chunkhash:7].js'
  },
  devtool: 'source-map',
  optimization: {
    // 以下选项在 mode === production 模式下默认开启
    // minimize: true
    // concatenateModules: true (webpack3 中的 new webpack.optimize.ModuleConcatenationPlugin(), 已废除)
    // noEmitOnErrors: true (webpack3 中的 new webpack.NoEmitOnErrorsPlugin(), 已废除)
  },
  plugins: [
    /* production 模式下默认开启
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }) */
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
