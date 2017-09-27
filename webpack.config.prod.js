import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
  devtool: 'source-map',

  noInfo: false,

  debug: true,

  target: 'web',

  entry: [
    path.join(__dirname, '/client/index.jsx'),
    path.join(__dirname, '/client/styles.scss')
  ],

  devServer: {
    contentBase: './client/build'
  },

  output: {
    path: path.join(__dirname, 'client/build'),
    publicPath: '/',
    filename: 'bundle.js'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'client'),
        loaders: ['babel-loader'],
        exclude: /node_modules/
      },

      {
        test: /\.jsx$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/ },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css!sass')
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff'
      }, {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff'
      }, {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/octet-stream'
      }, {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file'
      }

    ]
  },

  plugins: [

    new webpack.optimize.UglifyJsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new ExtractTextPlugin('styles.css', { allChunks: true })
  ],

  node: {
    net: 'empty',
    dns: 'empty'
  }

};
