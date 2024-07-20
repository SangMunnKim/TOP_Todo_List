const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  clean: true,
  plugins: [
    new HtmlWebpackPlugin({
      title: 'To do list',
      template: './template.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};