const webpack = require('webpack');

module.exports = {
  entry: {
    app: './src/Bus.ts'
  },
  output: {
    path: __dirname + '/dist',
    filename: 'index.js'
  },
  resolve: {
    extensions: ['.webpack.js', '.ts'],
    alias: {}
  },
  module: {
    loaders: [
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader'
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({ minimize: false })
  ]
};
