var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var StyleExtHtmlWebpackPlugin = require('style-ext-html-webpack-plugin');
var autoprefixer = require('autoprefixer');

module.exports = {
  context: path.resolve(__dirname + '/../src'),
  entry: {
    index: ['./index.tsx']
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname + '/../dist')
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          'awesome-typescript-loader'
        ]
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                modules: true,
                localIdentName: '[name]__[local]--[hash:base64:5]',
                camelCase: 'dashesOnly'
              }
            },
            'postcss-loader'
          ]
        })
      },
      {
        test: /\.png$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      inject: false
    }),
    new ExtractTextPlugin('[name].css'),
    new StyleExtHtmlWebpackPlugin({
      position: 'head-bottom'
    })
  ]
}
