const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExteactPlugin = require('mini-css-extract-plugin');

module.exports = {
	mode: 'development',
	entry:'./src/i.ts',
	devtool: 'inline-source-map',
	devServer: {
		static: './dist',
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'NotIndex',
		}),
	],
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist'),
		clean: true,
		publicPath: '/',

	},
	optimization: {
		runtimeChunk: 'single',
	},
	stats: {
		children: true,
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: [
					{loader:'ts-loader',
						options: 
            {transpileOnly:true}
				  },
				],
				exclude: /node_modules/,
			},
			{
				test: /\.(sa|sc|c)ss$/i,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource',
			},
			{
				rules: [{ test: /\.txt$/, use: 'raw-loader' }],
			},
		],
	},
	resolve: {
		extensions: ['.ts', '.js'],
	},
};