var DashboardPlugin = require('webpack-dashboard/plugin');
var HtmlPlugin = require('html-webpack-plugin');
var StyleLintPlugin = require('stylelint-webpack-plugin');
var autoprefixer = require('autoprefixer');

module.exports = {
  entry: {
    index: ['babel-polyfill', __dirname + '/../src/index.ts']
  },

  output: {
    filename: '[name].js',
    path: __dirname + '/../dist'
  },

  resolve: {
    extensions: ["", ".webpack.js", ".web.js", ".js", ".ts"]
  },

  module: {
    preLoaders: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'tslint'
      }
    ],
    loaders: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'babel!ts'
      },
      {
        test: /\.scss$/,
        loader: 'style!css?sourceMap!postcss?sourceMap!sass?sourceMap'
      },
      {
        test: /\.css$/,
        loader: 'style!css?sourceMap!postcss?sourceMap'
      },
      {
        test: /\.(png|jpe?g|svg|ttf|eot|woff2?)$/,
        loader: 'url?limit=10000'
      }
    ]
  },

  plugins: [
    new DashboardPlugin(),
    new HtmlPlugin({ template: __dirname + '/../src/index.html' }),
    new StyleLintPlugin({})
  ],

  devtool: 'source-map',

  postcss: function() {
    return [autoprefixer];
  },

  devServer: {
    inline: true,
    contentBase: __dirname + '/../dist',
    proxy: {
      '/socket.io/*': 'http://localhost:8081'
    }
  }
}
