const path = require('path');
const webpack = require('webpack')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const HappyPack = require('happypack')

module.exports = {
  mode: "development",
  entry: {
    performance: './src/performance.js',
    performance1: './src/performance1.js',
    performance2: './src/performance2.js',
    vendor: ["jquery"],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    // 增加缓存，首次增加性能，之后从缓存文件中读取。不要使用hash，因为每次改变文件，会全量编译
    filename: '[name].[chunkhash].js',
  },
  resolve: {
    alias: {
      'react': path.resolve(__dirname, './node_modules/react/index.js'),
    },
    extensions: [".js", ".json"],
    // 在哪些地方查找第三方模块名，如果在子目录下有node_modules，默认不会查找
    modules: [path.resolve(__dirname, 'node_modules')],
    // 只采用 main 字段作为入口文件描述字段，以减少搜索步骤
    mainFields: ['main'],
  },
  module: {
    // 显著
    noParse: /react/,
    rules: [
      {
        test: /\.js$/,
        // use: ['happypack/loader?id=babel'],
        use: ['babel-loader'],
        // 显著
        exclude: path.resolve(process.cwd(), 'node_modules'),
        include: path.resolve(__dirname, 'src'),
      },
      {
        test: /\.css$/, use: [
          'style-loader',
          'css-loader'
        ]
      },
    ],
  },
  // 调试编译后的文件,显著
  devtool: 'eval',

  externals: {
    // 使用window下的_
    'lodash': '_'
  },

  plugins: [
    // 多线程处理loader，在测试数量较少时反而会拖慢进程，需要大量的js编译文件测试
    // new HappyPack({
    //   id: 'babel',
    //   // babel-loader 支持缓存转换出的结果，通过 cacheDirectory 选项开启
    //   loaders: ['babel-loader?cacheDirectory'],
    // }),

    // 如果多个入口文件引用了一个文件，每个入口都会打入该文件，这个插件会把该文件抽取出来。
    new webpack.optimize.SplitChunksPlugin({
      chunks: 'all',
      minSize: 0,
      name: 'vendor',
      cacheGroups: {
        vendor: {
          test: /node_modules\//,
          enforce: true
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      }
    }),

    // 如果我一个js文件里面引入了css文件。这时要是我修改了js，但没修改css，能否让css能够继续利用缓存呢
    // css文件必须使用contenthash
    new ExtractTextPlugin({
      filename: 'css/[name]-[contenthash].css',
      disable: false,
      allChunks: true
    }),

    // 默认注入对象 
    new webpack.ProvidePlugin({
      $: "jquery",
    }),

    // ！！！！webpack4之前的方式
    // new webpack.optimize.CommonsChunkPlugin({ name: "vendor" })

    // 有些JS库有自己的依赖树，并且这些库可能有交叉的依赖，DedupePlugin可以找出他们并删除重复的依赖。
    // new webpack.optimize.DedupePlugin(),
  ],
};
