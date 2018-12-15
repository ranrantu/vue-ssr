const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const resolve = file => path.resolve(__dirname, file);
const useSourceMap = process.env.NODE_ENV === 'production' ? false : true;
const autoprefixer = require('autoprefixer');

console.log('NODE_ENV:', process.env.NODE_ENV);

module.exports = {
	output: {
		path: resolve('../dist'),
		publicPath: '/dist/',
		filename: '[name].[chunkhash].js'
	},
	resolve: {
		alias: {
			'public': path.resolve(__dirname, '../public')
		}
	},
	module: {
		noParse: /es6-promise\.js$/,
		rules: [
			{
				test: /\.vue$/,
				exclude: /node_modules/,
				use: 'vue-loader'
			},
			{
				test: /\.js$/,
				include: [resolve('src'), resolve('test')],
				use: 'babel-loader'
			},
			{
				test: /\.json$/,
				loader: 'json'
			},
			{
				test: /\.css$/,
				exclude: /node_modules/,
				use: [
					MiniCssExtractPlugin.loader,
					{ loader: 'css-loader', options: { sourceMap: useSourceMap }},
					{
						loader: 'postcss-loader',
						options: {
							plugins: [
								autoprefixer({
									browsers: ['last 2 versions', '> 1%']
								})
							]
						}
					}
				]
			},
			{
				test: /\.less$/,
				exclude: /node_modules/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							sourceMap: useSourceMap
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							plugins: [
								autoprefixer({
									browsers: ['last 2 versions', '> 1%']
								})
							]
						}
					},
					{
						loader: 'less-loader',
						options: {
							javascriptEnabled: true,
							sourceMap: useSourceMap
						}
					}
				]
			}
		]
	},
	plugins: [
		new VueLoaderPlugin(),
		new MiniCssExtractPlugin({
			filename: 'css/[name].[contenthash:5].css'
		})
	],
	performance: { hints: false },
	stats: {
		modules: false,
		children: false
	}
}
