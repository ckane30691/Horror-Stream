import React, { Component } from 'react';
import { connect } from 'react-redux';
import { receiveCurrentUser, meFromToken } from '../../actions/session_actions';
import App from './app';
import { withRouter } from 'react-router-dom';

const mapStateToProps = state => {
  return {loggedIn: Boolean(state.session.currentUser)};
};

const mapDispatchToProps = (dispatch) => {
  return {
  	 loadUserFromToken: () => {
       console.log('from AppContainer', sessionStorage);
  	 	let token = sessionStorage.getItem('jwtToken');
  	 	if(!token || token === '') {//if there is no token, dont bother
  	 		return;
  	 	}
      dispatch(meFromToken(token));
  	 },
  };
};

// added withRouter here because app.js was blocking rerenders without it
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
