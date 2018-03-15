const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

function join(dir) {
  return path.join(__dirname, '../src', dir)
}

class Page {
  constructor({ entry, title, name, chunk, template }) {
    this.entry = entry
    this.title = title
    this.name = name
    this.chunk = chunk
    this.template = template
  }
  generatePage() {
    return {
      entry: this.entry,
      plugins: [
        new HtmlWebpackPlugin({
          title: this.title,
          chunks: [this.chunk, 'common', 'vendors', 'manifest'],
          filename: `${this.name}.html`,
          template: this.template || path.resolve(__dirname, '../index.html'),
          minify: {
            removeComments: true,
            collapseWhitespace: true
          }
        })
      ]
    }
  }
}

module.exports = [
  new Page({
    entry: {
      index: join('index')
    },
    title: 'index',
    name: 'index',
    chunk: 'index'
  }).generatePage(),
  new Page({
    entry: {
      a: join('pages/pageA')
    },
    title: 'pageA',
    name: 'pageA',
    chunk: 'a'
  }).generatePage(),
  new Page({
    entry: {
      b: join('pages/pageB')
    },
    title: 'pageB',
    name: 'pageB',
    chunk: 'b'
  }).generatePage(),
  new Page({
    entry: {
      c: join('pages/pageC')
    },
    title: 'pageC',
    name: 'pageC',
    chunk: 'c'
  }).generatePage()
]
