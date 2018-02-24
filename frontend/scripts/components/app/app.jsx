import React from 'react';
import { Provider } from 'react-redux';
import { AuthRoute, ProtectedRoute } from '../../util/route_util.jsx';
import GreetingContainer from '../greeting/greeting_container';
import Splash from '../greeting/splash';
import Stream from '../stream/stream';

import {
  Route,
  Redirect,
  Switch,
  Link,
  HashRouter
} from 'react-router-dom';

class App extends React.Component {
  componentWillMount() {
    this.props.loadUserFromToken();
  }

  render() {
    return(
      <div>
        <header>
          <div className="home-container">
            <img className="icon" src="https://s3-us-west-1.amazonaws.com/nature-stream/iceberg.png"/>
            <Link to='/' className="header-link"><h1>Nature Stream <span>live</span></h1></Link>
            <GreetingContainer />
          </div>
        </header>



        <Switch>
          // <AuthRoute exact path="/" component={Splash} />
          // <ProtectedRoute exact path="/stream" component={Stream} />
        </Switch>
      </div>
    );
  }
}




export default App;
