const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.config');
const nodeExternals = reuqire('webpack-node-externals');
const VueSSRServerPlugin = reuqire('vue-server-renderer/server-plugin');

module.exports = merge(baseWebpackConfig, {
	entry: '../server/server.js',
	target: 'node',
	devtool: 'source-map',
	output: {
		libraryTarget: 'commonjs2'
	},
	externals: nodeExternals({
		whitelist: /\.css$/
	}),
	plugins: [
		new VueSSRServerPlugin()
	]
});