var merge = require('webpack-merge');
var base = require('./base.conf');
var webpack = require('webpack');

module.exports = merge(base, {
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin()
  ]
});
