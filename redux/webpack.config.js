'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

console.log(process.env.API_URL)

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    'babel-polyfill',
    'webpack-hot-middleware/client?reload=true',
    path.join(__dirname, 'src/index.js')
  ],
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: '[name].js',
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.tpl.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      'process.env.API_URL': JSON.stringify(process.env.API_URL)
    })
  ],
  module: {
    loaders: [
        {
            test: /\.jsx?$/,
            loaders: ['react-hot', 'babel'],
            include: path.join(__dirname, 'src')
        },
        {
          test: /\.js$/,
          loaders: ['babel'],
          include: path.join(__dirname, 'src')
        },
        {
          test: /\.json?$/,
          loader: 'json'
        },
        {
          test: /\.css$/,
          loaders: ['style', 'css']
        }
    ],
    resolve: {
        extensions: ['', '.js', '.jsx'],
    }
  }
};
