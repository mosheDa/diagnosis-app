import React, { Component } from 'react';

class Unauthorized extends Component {

  render() {
    
    const { login, isAuthenticated } = this.props.auth;

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
        you are not authorized
      </div>
    );
  }
}

export default Unauthorized;
