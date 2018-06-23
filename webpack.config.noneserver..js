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
    chunkFilename: "[name].min.js" // chunkname是未被列在entry中，却又需要被打包出来的文件命名配置。什么场景需要呢？我们项目就遇到过，在按需加载（异步）模块的时候，这样的文件是没有被列在entry中的，如使用CommonJS的方式异步加载模块：
  },
  module: {
    noParse: /jquery|lodash/,
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
  // 调试编译后的文件
  // devtool: 'eval',
  // 默认:cheap-module-eval-source-map,最佳
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new ManifestPlugin(),
    new HtmlWebpackPlugin({
      title: 'Output Management'
    })
  ],
};