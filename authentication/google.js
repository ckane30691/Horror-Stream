const passport = require('passport');
const passportGoogle = require('passport-google-oauth');
const config = require('../config');
const users = require('./users');

const passportConfig = {
    clientID: config.get('authentication.google.clientId'),
    clientSecret: config.get('authentication.google.clientSecret'),
    callbackURL: 'https://node-react-test1.herokuapp.com/api/authentication/google/redirect'
};
