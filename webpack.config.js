import path from 'path';
import webpack from 'webpack';

export default {
	devtool: 'eval-source-map',

	entry: [

		'webpack-hot-middleware/client',
		path.join(__dirname,'/client/index.js')
	],

	output: {
		path: '/',
		publicPath: '/',
		filename: "bundle.js"
	},

	plugins: [

		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
	    new webpack.optimize.UglifyJsPlugin({
	      beautify: false,
	      mangle: {
	        screw_ie8: true,
	        keep_fnames: true
	      },
	      compress: {
	        screw_ie8: true
	      },
	      comments: false
	    }),

	    new webpack.LoaderOptionsPlugin({
	      minimize: true,
	      debug: false
	    }),

	    new webpack.DefinePlugin({
	      'process.env.NODE_ENV': JSON.stringify('production')
	    })
	],

	module: {
		loaders: [
			{
				test: /\.js$/,

				include: path.join(__dirname,'client'),

				loaders: ['react-hot-loader','babel-loader'],

				exclude: /node_modules/
			},

			{ test: /\.jsx$/, loaders: ['react-hot-loader','babel-loader'], exclude: /node_modules/ }


		]
	},

	/*resolve: {
		extensions: ['.js','.jsx']
	}*/
}