import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
  devtool: 'eval-source-map',

  entry: [
    'webpack-hot-middleware/client',
    path.join(__dirname, '/client/index.js'),
    path.join(__dirname, '/client/styles.scss')
  ],

  output: {
    path: path.join(__dirname, 'client/dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,

        include: path.join(__dirname, 'client'),

        loaders: ['react-hot-loader','babel-loader'],

        exclude: /node_modules/
      },

      { test: /\.jsx$/, loaders: ['react-hot-loader','babel-loader'], exclude: /node_modules/ },

      {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                use: [{
                    loader: "css-loader"
                }, {
                    loader: "sass-loader"
                }]
            }),
            exclude: /node_modules/
        }
		]

	},

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin({ filename: 'styles.css' })
  ],

};
