const Vue = require('vue');
const app = require('express')();
const { createRenderer } = require('vue-server-renderer');
const renderer = createRenderer();
const path = require('path');

const templatePath = path.resolve(__dirname, '../client/index.template.html');

const isProd = process.env.NODE_ENV === 'production';

if (isProd) {

} else {
	readyPromise = require('./build/setup-dev-server')(
    app,
    templatePath,
    (bundle, options) => {
      renderer = createRenderer(bundle, options)
    }
  )
}

app.set('port', 8080);

app.get('*', (req, res) => {
	if (!renderer) {
		return res.end('waiting for compilation... refresh in a moment.');
	}

	const s = Date.now();

  res.setHeader("Content-Type", "text/html");

  const errorHandler = err => {
    if (err && err.code === 404) {
      res.status(404).end('404 | Page Not Found');
    } else {
      // Render Error Page or Redirect
      res.status(500).end('500 | Internal Server Error');
      console.error(`error during render : ${req.url}`);
      console.error(err);
    }
  };

  const context = {
    title: 'Vue SSR', // default title
    url: req.url
  }
  // 流状态传输
  // renderer.renderToStream({ url: req.url })
  // 	.on('data', data => {
  // 		html += data.toString();
  // 	})
  //   .on('error', errorHandler)
  //   .on('end', () => console.log(`whole request: ${Date.now() - s}ms`))
  //   .pipe(res);
  // 普通传输
  renderer.renderToString(context, (err, html) => {
    // if (err) {
    //   return errorHandler(err)
    // }
    res.send(html)
    if (!isProd) {
      console.log(`whole request: ${Date.now() - s}ms`)
    }
  })
});

app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'))
});