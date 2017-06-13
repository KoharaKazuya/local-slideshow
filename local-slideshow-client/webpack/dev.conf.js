var merge = require('webpack-merge');
var base = require('./base.conf');

module.exports = merge(base, {
  devtool: 'inline-source-map'
});
