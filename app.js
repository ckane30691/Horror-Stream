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
