const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { watch } = require('fs');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  output: {
    filename: 'main.[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'To do list',
      filename: 'main.html',
      template: './src/template.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  watch: true,
};