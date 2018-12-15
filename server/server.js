const Vue = require('vue');
const app = require('express')();
const { createRenderer } = require('vue-server-renderer');
const renderer = createRenderer();

app.set('port', 8080);

app.get('*', (req, res) => {
	const app = new Vue({
		data: {
			url: req.url
		},
		template: `<div>访问的 URL 是：{{url}}</div>`
	});

	renderer.renderToString(app, (err, html) => {
		if (err) {
			if (err.code === 404) {
				res.status(404).end('Page not found');
			} else {
				res.status(500).end('Internal Server Error');
			}
		} else {
			res.end(html);
		}
		// res.end(`
		// 	<!DOCTYPE html>
		// 	<html lang="en">
		// 		<head>
		// 			<title>Hello</title>
		// 		</head>
		// 		<body>${html}</body>
		// 	</html>
		// `);
	});
});

app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'))
});