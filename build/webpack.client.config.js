const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config.js');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');

module.exports = merge(baseConfig, {
	entry: '/path/to/entry-client.js',
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			name: 'mainfest',
			minChunks: Infinity
		}),
		new VueSSRClientPlugin()
	]
});