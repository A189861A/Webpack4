const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const webpackBaseConf = require('./webpack.base.conf')

const HOST = 'localhost'
const PORT = 8080

const webpackDevConf = {
  // 指定为开发模式，也可以在命令行参数上设置
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
    historyApiFallback: true,
    open: true,
    hot: true,
    overlay: {
      warning: false,
      errors: true
    },
    proxy: {},
    before(app) {}
  },
  optimization: {
    noEmitOnErrors: true
    // 以下选项在 mode === development 模式下默认开启
    // namedModules: true (webpack3 中的 new webpack.NamedModulesPlugin(), 已废除)
  },
  plugins: [
    /* development 模式下默认开启
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }) */
    new webpack.HotModuleReplacementPlugin()
  ]
}

module.exports = merge(webpackBaseConf, webpackDevConf)
