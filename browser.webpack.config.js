const path = require('path');
const webpack = require('webpack');
const { getIfUtils, removeEmpty } = require('webpack-config-utils');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const nodeEnv = process.env.NODE_ENV || 'development';
const { ifDevelopment, ifProduction } = getIfUtils(nodeEnv);

module.exports = removeEmpty({
  entry:  './src/index_browser.js',

  output: {
    filename: ifProduction('rise.js', 'rise-bundle.js'),
    path: path.resolve(__dirname, 'public'),
  },

  module: {
    rules: [
      {
        test: /\.(sass|scss)$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
        }),
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader'],
        }),
      },
      {
        test: /\.js/,
        use: ['babel-loader?cacheDirectory'],
        exclude: /node_modules/,
      },
    ],
  },

  devtool: ifDevelopment('eval-source-map', 'source-map'),

  devServer: ifDevelopment({
    host: '0.0.0.0',
    port: 4000,
    overlay: true,
    stats: 'normal',
  }),

  plugins: removeEmpty([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(nodeEnv),
      },
    }),

    new HtmlWebpackPlugin({
      hash: true,
      filename: 'index.html',
      template: './src/index.ejs',
      environment: nodeEnv,
    })
  ]),
});
