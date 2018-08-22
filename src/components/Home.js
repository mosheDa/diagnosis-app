import React, { Component } from 'react';
import Nav from './Nav';
import { login, logout, isLoggedIn } from '../utils/AuthService';
import Button from '@material-ui/core/Button';

class Home extends Component {


  render() {

    return (
      <div>
        <h2 className="text-center">Home page </h2>
        
           {
             (isLoggedIn()) ? "" : (  
             <Button  onClick={() => login()} variant="outlined" color="primary"  >
             Login
           </Button>
            )
           }
        
      </div>
    );
  }
}

export default Home;
