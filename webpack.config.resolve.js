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
    // server的查找目录
  },
  resolve: {
    alias: {
      Templates: path.resolve(__dirname, 'src/templates/')
    },
    extensions: [".js", ".json"],
    // 在哪些地方查找第三方模块名，如果在子目录下有node_modules，默认不会查找
    modules: [path.resolve(__dirname, "src"), "node_modules"]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loaders: ['babel-loader'],
        exclude: path.resolve(process.cwd(), 'node_modules'),
      },
      {
        test: /\.css$/, use: [
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
    ],
  },
  devServer: {
    // devserver的查找目录
    contentBase: './dist',
  },
  // 调试编译后的文件
  devtool: 'eval-source-map',
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new ManifestPlugin(),
    new HtmlWebpackPlugin({
      title: 'Output Management'
    })
  ],
};
