var merge = require('webpack-merge');
var dev = require('./dev.conf');
var DashboardPlugin = require('webpack-dashboard/plugin');
var path = require('path');

module.exports = merge(dev, {
  devServer: {
    contentBase: path.resolve(__dirname + '/../dist'),
    port: 9000,
    historyApiFallback: {
      rewrites: [
        { from: /^\/controller\/\d+$/, to: '/' },
        { from: /./,                   to: '/' }
      ]
    },
    proxy: {
      '/socket.io/*': 'http://localhost:8081'
    }
  },

  plugins: [
    new DashboardPlugin()
  ]
});
