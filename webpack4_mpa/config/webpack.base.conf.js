const path = require('path')
// const webpack = require('webpack')
const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const pagesConf = require('./pages.conf')

const baseConf = {
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      pages: path.join(__dirname, '../src/pages')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        include: path.join(__dirname, '../src'),
        loader: 'eslint-loader',
        options: {
          formatter: require('eslint-friendly-formatter'),
          emitWarning: true
        }
      },
      {
        test: /\.js$/,
        include: path.join(__dirname, '../src'),
        use: [
          {
            loader: 'cache-loader',
            options: {
              cacheDirectory: path.join(
                __dirname,
                '../node_modules/cache-loader/.cache-loader'
              )
            }
          },
          'babel-loader'
        ]
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                sourceMap: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        })
      },
      {
        test: /\.(sass|scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                sourceMap: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        })
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'img/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'media/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[hash:7].[ext]'
        }
      }
    ]
  },
  optimization: {
    runtimeChunk: {
      name: 'manifest'
    },
    splitChunks: {
      // 提取多个入口文件中的公共模块
      chunks: 'all',
      name: 'common',
      minSize: 10000,
      minChunks: 3,
      cacheGroups: {
        vendors: {
          name: 'vendors',
          test: path.resolve(__dirname, '../node_modules'),
          enforce: true
        }
      }
    }
  },
  externals: {
    jquery: 'window.jQuery'
  },
  plugins: [
    /* new webpack.ProvidePlugin({
      _: 'lodash'
    }), */
    new ExtractTextPlugin({
      filename: 'css/[name].[contenthash:7].css',
      allChunks: true
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: path.resolve(__dirname, '../dist/static')
      }
    ])
  ]
}

module.exports = merge([baseConf].concat(pagesConf))
