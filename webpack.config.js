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
		new webpack.DefinePlugin({
	      'process.env.NODE_ENV': JSON.stringify('production')
	    }),
	    new webpack.optimize.UglifyJsPlugin({
	      sourceMap: options.devtool && (options.devtool.indexOf("sourcemap") >= 0 || options.devtool.indexOf("source-map") >= 0)
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