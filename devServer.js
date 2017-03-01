var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config');
var _ = require('lodash');
var app = express();
var compiler = webpack(config);

app.use(express.static('./src/client/assets'));

app.use(require('webpack-dev-middleware')(compiler, {
	noInfo: true,
	publicPath: config.output.publicPath,
	 watchOptions: {
        aggregateTimeout: 300,
        poll: true
    }
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function (req, res) {
	if(_.endsWith(req.originalUrl,".css")) {
		res.setHeader('content-type', 'text/css');
	}
	res.sendFile(path.join(__dirname, './src/client/index.html'));
});

app.listen(4000, 'localhost', function (err) {
	if (err) {
		console.log(err);
		return;
	}

	console.log('Listening at http://localhost:4000/');
});
