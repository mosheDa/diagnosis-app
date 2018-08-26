import React, { Component } from 'react';
import { login, logout, isLoggedIn } from '../utils/AuthService';
import Button from '@material-ui/core/Button';
import Img from 'react-image'

class Restricted extends Component {


  render() {
    const styles= {
      image:{
        display: "block",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop:"5%",
        width: "50%",
    
      },
      login:{
        marginLeft: "auto",
        marginRight: "auto",
        display: "block",
        
      }

    }

    return (
      <div >
        <Button style={styles.login} onClick={login} variant="contained" color="primary">Please Login</Button>
        {/* <Img style={styles.image} src="https://www.seton.com/media/catalog/product/cache/4/image/85e4522595efc69f496374d01ef2bf13/1435185270/r/e/restricted-area-security-stop-signs-m9081-lg.png" /> */}
      </div>
    );
  }
}

export default Restricted;
