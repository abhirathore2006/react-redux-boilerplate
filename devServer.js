var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config');
var _ = require('lodash');
var app = express();
var compiler = webpack(config);

//for logging
var morgan      = require('morgan');
var jsonServer = require('json-server');

//for authentication
var bodyParser  = require('body-parser');
var jwt    = require('jsonwebtoken');

//serve satic files form
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

// use morgan to log requests to the console
app.use(morgan('dev'));

/** code for fake api and authentication starts **/
app.set('superSecret', 'secretPasswordForjwt-here'); // secret variable

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// get an instance of the router for api routes
var apiRoutes = express.Router();

	// route to authenticate a user (POST http://localhost:8080/fakeapi/authenticate)
	apiRoutes.post('/authenticate', function(req, res) {

    var user ={email:'abhirathore2006@gmail.com',password:'dummy'}

    if (!user || user.email != req.body.email ) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {
      // check if password matches
      if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {

        // if user is found and password is right
        // create a token
        var token = jwt.sign(user, app.get('superSecret'), {
          expiresIn: '1d' // expires in 24 hours
        });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }

    }

  });

	// get an instance of the json-server router for authencated routes only
	//https://github.com/typicode/json-server for documentation
	const authenticatedRoutes = jsonServer.router('./fakeapi/db.json')
	authenticatedRoutes.use(function(req, res, next) {

	  // check header or url parameters or post parameters for token
	  var token = req.body.token || req.query.token || req.headers['x-access-token'];

	  // decode token
	  if (token) {

	    // verifies secret and checks exp
	    jwt.verify(token, app.get('superSecret'), function(err, decoded) {
	      if (err) {
	        return res.json({ success: false, message: 'Failed to authenticate token.' });
	      } else {
	        // if everything is good, save to request for use in other routes
	        req.user = decoded;
	        next();
	      }
	    });

	  } else {

	    // if there is no token
	    // return an error
	    return res.status(403).send({
	        success: false,
	        message: 'No token provided.'
	    });

	  }
	});


app.use('/fakeapi', apiRoutes);
app.use('/fakeapi/authenticated', authenticatedRoutes);

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
