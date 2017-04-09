var path = require('path');
var webpack = require('webpack');

module.exports = {
	debug: true,
	devtool: 'inline-source-map',
	entry: [
		'webpack-hot-middleware/client?reload=true',
		'./src/client/client.jsx'
	],
	output: {
		path: path.join(__dirname, './src/client/assets'),
		filename: 'bundle.js',
		publicPath: "/"
	},
	plugins:[
		new webpack.HotModuleReplacementPlugin()
	],
	module: {
		loaders: [
			{
				test: /\.js(x?)$/,
				loaders: ['babel-loader?cacheDirectory,presets[]=react,presets[]=es2015,presets[]=stage-0'],
				include: path.join(__dirname, 'src')
			}
    ]
	},
	resolve: {
		root: [path.resolve('./src')],
		extensions: ['', '.jsx', '.js']
	}
};
