const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: ['babel-polyfill', path.resolve(__dirname, '../src/index.tsx')],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      src: path.join(__dirname, '../src')
    }
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        enforce: 'pre',
        include: path.join(__dirname, '../src'),
        loader: 'eslint-loader',
        options: {
          formatter: require('eslint-friendly-formatter'),
          emitWarning: true
        }
      },
      {
        test: /\.jsx?$/,
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
        test: /\.tsx?$/,
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
          'babel-loader',
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true
            }
          }
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
    // 分离 runtime 和 manifest
    runtimeChunk: {
      name: 'manifest'
    },
    splitChunks: {
      cacheGroups: {
        // 分离第三方库，可以不用在入口文件中定义 vendors
        vendors: {
          chunks: 'all',
          name: 'vendors',
          // test可以为 String 或者 RegExp, 下面值可为 /[\\/]node_modules[\\/]/
          test: path.resolve(__dirname, '../node_modules'),
          enforce: true
        }
      }
    }
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'css/[name].[contenthash:7].css',
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '../index.html'),
      minify: {
        removeComments: true,
        collapseWhitespace: true
      }
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: path.resolve(__dirname, '../dist/static')
      }
    ])
  ]
}
