/* global process */

const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const copyOptions = {
  patterns: [{
    from: 'robots.txt',
    to: '.',
  }, {
    from: 'index.html',
    to: '.',
  }, {
    from: 'favicon.svg',
    to: '.',
  }],
};

function getDevTool() {
  if (process.env.NODE_ENV !== 'production') {
    return 'source-map';
  }

  return false;
}

module.exports = {
  entry: {
    main: './src/main.jsx',
  },
  output: {
    filename: './[name].js',
  },
  devtool: getDevTool(),
  module: {
    rules: [{
      test: /\.js$|\.jsx$/,
      exclude: /node_modules/,
      enforce: 'pre',
      loader: 'eslint-loader'
    }, {
      test: /\.js$|\.jsx$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }],
  },
  plugins: [
    new CopyWebpackPlugin(copyOptions),
  ],
};
