import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const GLOBALS = {
  'processs.env.NODE_ENV': JSON.stringify('production')
};

export default {
  devtool: 'source-map',

  target: 'web',

  entry: [
    'webpack-hot-middleware/client',
    path.join(__dirname, '/client/index.js')
  ],

  devServer: {
    contentBase: './client/dist'
  },

  output: {
    path: path.join(__dirname, 'client/dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },

  plugins: [
    new webpack.DefinePlugin(GLOBALS),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin({ filename: 'styles.css' })
  ],

  module: {
    loaders: [
      {
        test: /\.js$/,

        include: path.join(__dirname, 'client'),

        loaders: ['react-hot-loader', 'babel-loader'],

        exclude: /node_modules/
      },

      { test: /\.jsx$/, loaders: ['react-hot-loader', 'babel-loader'], exclude: /node_modules/ },

      {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                use: [{
                    loader: "css-loader"
                }, {
                    loader: "sass-loader"
                }]
            })
        }


    ]
  },

};
