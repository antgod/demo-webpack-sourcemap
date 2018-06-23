const path = require('path');

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
    publicPath: '/demo'
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
};
