import Vue from 'Vue';

// create a Vue instance
const app = new Vue({
	template: `<div>Vue App</div>`
});

// create a renderer
const renderer = require('vue-server-render').createRenderer();

// render a Vue instance to HTML
renderer.renderToString(app, (err, html) => {
	if (err) {
		throw err;
	}
	console.log(html);
	// => <div data-server-rendered="true">Vue App</div>
});

// in version 2.5.0+, return a Promise
renderer.renderToString(app).then(html => {
	console.log(html);
}).catch(err => {
	console.error(err);
})