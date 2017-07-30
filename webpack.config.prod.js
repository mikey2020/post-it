import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const extractSass = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
    disable: process.env.NODE_ENV === "development"
});

const GLOBALS = {
  'processs.env.NODE_ENV': JSON.stringify('production')
};

export default {
  devtool: 'source-map',

  noInfo: false,

  debug: true,

  target: 'web',

  entry: [
    'webpack-hot-middleware/client',
    path.join(__dirname, '/client/index.js'),
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
    extractSass
  ],

  module: {
    loaders: [
      {
        test: /\.js$/,

        include: path.join(__dirname, 'client'),

        loaders: ['babel-loader'],

        exclude: /node_modules/
      },

      { test: /\.jsx$/, loaders: ['babel-loader'], exclude: /node_modules/ },

      
        {
            test: /\.scss$/,
            use: extractSass.extract({
                use: [{
                    loader: "css-loader"
                }, {
                    loader: "sass-loader"
                }],
                // use style-loader in development
                fallback: "style-loader"
            })
        }

    ]
  },

};
