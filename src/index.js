import React from 'react';
import ReactDOM from 'react-dom';
import Upload from './components/Upload';
import Restricted from './components/Restricted';
import Display from './components/Display';
import DisplayByName from './components/DisplayByName';
import SelectChild from './components/SelectChild';
import Callback from './components/Callback';
import Home from './components/Home';
import registerServiceWorker from './registerServiceWorker';
import { Switch,Router, Route , BrowserRouter} from 'react-router-dom'
import { requireAuth } from './utils/AuthService';
import history from './components/history';
import AppBar from './components/AppBar';
import { AuthRoute } from 'react-router-auth';
import { login, logout, isLoggedIn } from './utils/AuthService';


const Root = () => {
  return (
    
    <div className="container">
        <Router history={history}>
        <div>
          <AppBar/>
          <AuthRoute path="/select" component={SelectChild} redirectTo="/restricted" authenticated={isLoggedIn()} />
          <AuthRoute path="/name/:username" component={DisplayByName} redirectTo="/restricted" authenticated={isLoggedIn()} />          
          <Route exact path="/" component={Home}/>
          <Route exact path="/restricted" component={Restricted}/>          
          {/* <Route path="/name/:username" component={DisplayByName} /> */}
          {/* <Route path="/select" component={SelectChild}/>                                                         */}
          <Route path="/upload" component={Upload} onEnter={requireAuth} />
          {/* <Route path="/all" component={Display} onEnter={requireAuth} />           */}
          <Route path="/callback" component={Callback} onEnter={requireAuth} />
        </div>
        </Router>
    </div>
  )
}

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();