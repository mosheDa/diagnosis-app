import Auth from './utils/AuthService';
import React from 'react';
import ReactDOM from 'react-dom';
import Upload from './components/Upload';
import Restricted from './components/Restricted';
import DisplayByName from './components/DisplayByName';
import SelectChild from './components/SelectChild';
import Callback from './components/Callback';
import Unauthorized from './components/Unauthorized';
import Home from './components/Home';
import registerServiceWorker from './registerServiceWorker';
import { Router, Route  } from 'react-router-dom'
import history from './components/history';
import AppBar from './components/AppBar';
import { AuthRoute } from 'react-router-auth';

const auth = new Auth();

const handleAuthentication = ({location}) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
}

const Root = () => {
  
  return (
    
    <div className="container">
        <Router history={history}>
        <div>
          <AppBar auth={auth}/>
          <Route path="/select" render={(props) => (
             (!auth.isLoggedIn() ) ? (
           <Restricted auth={auth} {...props} /> 
           ) : (
            !auth.userInGroup(['Experts']) ? (
              <Unauthorized auth={auth} {...props} /> 
              ) : (
             (
              <SelectChild auth={auth} {...props} />
            )))
          )} />
           <Route path="/name/:username" render={(props) => (
            (!auth.isLoggedIn() ) ? (
              <Restricted auth={auth} {...props} />
            ) : 
            (
              !auth.userInGroup(['Experts']) ? (
               <Unauthorized auth={auth} {...props} /> 
               ) : (
              (
               <DisplayByName auth={auth} {...props} />
             )))
          )} />
          {/* <AuthRoute path="/select" component={SelectChild} redirectTo="/restricted" auth={auth} authenticated={auth.isAuthenticated()} /> */}
          {/* <AuthRoute path="/name/:username" component={DisplayByName} redirectTo="/restricted" auth={auth} authenticated={auth.isAuthenticated()} />           */}
          <Route exact path="/" component={Home}/>
          <Route exact render={(props) => <Restricted auth={auth} {...props} />} path="/restricted" />          
          {/* <Route path="/upload" component={Upload} onEnter={auth.requireAuth} /> */}
          {/* <Route path="/all" component={Display} onEnter={Auth.requireAuth} />           */}
          <Route path="/callback" render={(props) => {
            handleAuthentication(props);
            return <Callback {...props} /> 
          }}/>  
        </div>
        </Router>
    </div>
  )
}

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();