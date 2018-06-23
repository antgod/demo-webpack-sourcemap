const path    = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
      vendor: ['react', 'react-dom']
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].dll.js',
    /**
     * output.library
     * window.${output.library}
     */
    library: '[name]_library'
  },
  plugins: [
    new webpack.DllPlugin({
      /**
       * path
       * [name]的部分被转换成entry
       */
      path: path.join(__dirname, 'dist', '[name]-manifest.json'),
      /**
       * name
       * 哪一个空间（global变量）有dll bundle
       * output.library
       */
      name: '[name]_library'
    })
  ]
};