const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const devtool = 'source-map'

module.exports = {
  entry: {
    common: './src/sourcemap.js',
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'dist.js',
  },
  plugins: [
    // new UglifyJsPlugin({
    //   uglifyOptions: {
    //     output: {
    //       ascii_only: true
    //     },
    //   },
    // }),
  ].filter(item => item),
  module: {
    rules: []
  },
  devtool,
}