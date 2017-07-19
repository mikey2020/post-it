import path from 'path';
import webpack from 'webpack';

const GLOBALS = {
  'processs.env.NODE_ENV': JSON.stringify('production')
};

export default {
  devtool: 'source-map',

  entry: [
    'webpack-hot-middleware/client',
    path.join(__dirname, '/client/index.js')
  ],

  output: {
    path: path.join(__dirname, '/dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin(GLOBALS),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ],

  module: {
    loaders: [
      {
        test: /\.js$/,

        include: path.join(__dirname, 'client'),

        loaders: ['react-hot-loader', 'babel-loader'],

        exclude: /node_modules/
      },

      { test: /\.jsx$/, loaders: ['react-hot-loader', 'babel-loader'], exclude: /node_modules/ }


    ]
  },

};
