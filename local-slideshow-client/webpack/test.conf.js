var merge = require('webpack-merge');
var base = require('./base.conf');

module.exports = merge.strategy({
  // StyleExtHtmlWebpackPlugin がエラーになるので無視するように
  // (CSS 周りはテストで不要)
  plugins: 'replace'
})(base, {
  target: 'node',

  plugins: []
});
