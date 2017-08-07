import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
  devtool: 'source-map',

  noInfo: false,

  debug: true,

  target: 'web',

  entry: [
    'webpack-hot-middleware/client',
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

  plugins: [

    new webpack.optimize.UglifyJsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('css/style.css', {
      allChunks: true
    })
  ],

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
      }

    ]
  },

  node: {
    net: 'empty',
    dns: 'empty'
  }

};
