import React, { Component } from 'react';
import Nav from './Nav';
import { login, logout, isLoggedIn } from '../utils/AuthService';
import Button from '@material-ui/core/Button';
import Img from 'react-image'

class Home extends Component {


  render() {
    const styles= {
      image:{
        display: "block",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop:"5%",
        width: "50%",
    
      }
    }

    return (
      <div >
        <Img style={styles.image} src="https://www.mstrust.org.uk/sites/default/files/Diagnosis-content-image.jpg" />
      </div>
    );
  }
}

export default Home;
