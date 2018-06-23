const path = require('path');
// 创建html文件引入所有编译资源
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 每次前编译清理之前的编译资源
const CleanWebpackPlugin = require('clean-webpack-plugin');
// webpack编译后生成编译列表
const ManifestPlugin = require('webpack-manifest-plugin');

module.exports = {
  mode: "development",
  entry: {
    index: './src/index.js',
    app: './src/app.js',
  },
  output: {
    filename: '[name]-[chunkhash].[id].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  devServer: {
    // devserver的查找目录
    contentBase: './dist',
  },
  // 调试编译后的文件
  // devtool: 'eval',
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new ManifestPlugin(),
    new HtmlWebpackPlugin({
      title: 'Output Management'
    })
  ],
};