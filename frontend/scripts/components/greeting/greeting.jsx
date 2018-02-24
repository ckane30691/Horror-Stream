import React from 'react';
import {Link} from 'react-router-dom';

const sessionLinks = (login) => (
	<nav className="login-signup">
    <button
      id="google"
      onClick={() => login('google')}>
      Authenticate with Google+
    </button>
	</nav>
);

const personalGreeting = (currentUser, logout) => (
	<hgroup className="header-group">
		<h2 className="header-name">Welcome to the Live Stream!</h2>
		<button className="header-button" onClick={logout}>Log Out</button>
	</hgroup>
);

const Greeting = ({ currentUser, logout, login }) => (
  currentUser ? personalGreeting(currentUser, logout) : sessionLinks(login)
);

export default Greeting;
