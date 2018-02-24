const express = require('express');
const mustacheExpress = require('mustache-express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const config = require('./config');
const token = require('./authentication/token');

require('./authentication/jwt');
require('./authentication/google');

// Make sure env_variables are set
if (!process.env.JWT_SECRET || !process.env.CLIENT_ID ||
  !process.env.CLIENT_SECRET) {
  console.error('ERROR!: Please set JWT_SECRET before running the app. \n run: export JWT_SECRET=<some secret string> to set JWTSecret. ');
  process.exit();
}

const app = express();

app.engine('html', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/static_pages');

//middleware config
app.use(passport.initialize());

const logger = require('morgan');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Request-Headers", "*");
  res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(function(req, res, next) {
  // check header or url parameters or post parameters for token
  let token = req.headers['authorization'];
  if (!token) return next();

  token = token.replace('Bearer ', '');

  jwt.verify(token, process.env.JWT_SECRET, function(err, user) {
    if (err) {
      return res.status(401).json({
        success: false,
        message: 'Please Log in using a valid email to view stream'
      });
    } else {
      req.user = user;
      next();
    }
  });
});

app.get('*.js', function (req, res, next) {
  req.url = req.url + '.gz';
  res.set('Content-Encoding', 'gzip');
  next();
});

app.get('/api/authentication/google/start',
    passport.authenticate(
      'google',
      { session: false, scope: ['openid', 'profile', 'email'] })
    );

app.get('/api/authentication/google/redirect',
    passport.authenticate(
      'google',
      { session: false }),
      generateUserToken
    );

app.get('/api/me/from/token', function(req, res, next) {
  // check header or url parameters or post parameters for token
  let token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (!token) {
    return res.status(401).json({
      message: 'Must pass token'
    });
  }

  // decode token
  jwt.verify(token, process.env.JWT_SECRET, function(err, user) {
    if (err) {
      throw err;
    }
    res.json({
      token: token
    });
  });
});

// Generate the Token for the user authenticated in the request
function generateUserToken(req, res) {
    const accessToken = token.generateAccessToken(req.user.id);
    let user = JSON.stringify(req.user);
    res.render('authenticated.html', {
      user: {
        user
      },
      token: accessToken
    });
}

const port = config.get('http.port');
app.listen(port, () => {
    console.log('Server listening on port ' + port);
});
