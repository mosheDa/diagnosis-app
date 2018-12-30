import React, { Component } from 'react';

class Unauthorized extends Component {
    
    render() {    

    return (
        <div>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags */}
        <title>404 HTML Template by Colorlib</title>
        <style dangerouslySetInnerHTML={{__html: "\n\t* {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n}\n\nbody {\n  padding: 0;\n  margin: 0;\n}\n\n#notfound {\n  position: relative;\n  height: 100vh;\n  background-color: #222;\n}\n\n#notfound .notfound {\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  -webkit-transform: translate(-50%, -50%);\n      -ms-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n}\n\n.notfound {\n  max-width: 460px;\n  width: 100%;\n  text-align: center;\n  line-height: 1.4;\n}\n\n.notfound .notfound-404 {\n  height: 158px;\n  line-height: 153px;\n}\n\n.notfound .notfound-404 h1 {\n  font-family: 'Josefin Sans', sans-serif;\n  color: #222;\n  font-size: 220px;\n  letter-spacing: 10px;\n  margin: 0px;\n  font-weight: 700;\n  text-shadow: 2px 2px 0px #c9c9c9, -2px -2px 0px #c9c9c9;\n}\n\n.notfound .notfound-404 h1>span {\n  text-shadow: 2px 2px 0px #ffab00, -2px -2px 0px #ffab00, 0px 0px 8px #ff8700;\n}\n\n.notfound p {\n  font-family: 'Josefin Sans', sans-serif;\n  color: #c9c9c9;\n  font-size: 16px;\n  font-weight: 400;\n  margin-top: 0px;\n  margin-bottom: 15px;\n}\n\n.notfound .link {\n  font-family: 'Josefin Sans', sans-serif;\n  font-size: 14px;\n  text-decoration: none;\n  text-transform: uppercase;\n  background: transparent;\n  color: #c9c9c9;\n  border: 2px solid #c9c9c9;\n  display: inline-block;\n  padding: 10px 25px;\n  font-weight: 700;\n  -webkit-transition: 0.2s all;\n  transition: 0.2s all;\n}\n\n.notfound .link:hover {\n  color: #ffab00;\n  border-color: #ffab00;\n}\n\n@media only screen and (max-width: 480px) {\n  .notfound .notfound-404 {\n    height: 122px;\n    line-height: 122px;\n  }\n\n  .notfound .notfound-404 h1 {\n      font-size: 122px;\n  }\n}\n\n\n\t" }} />
        {/* Google font */}
        <link href="https://fonts.googleapis.com/css?family=Josefin+Sans:400,700" rel="stylesheet" /> 
        {/* Custom stlylesheet */}
        <link type="text/css" rel="stylesheet" href="css/style.css" />
        {/* HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries */}
        {/* WARNING: Respond.js doesn't work if you view the page via file:// */}
        {/*[if lt IE 9]>
                
                
              <![endif]*/}
        <div id="notfound">
          <div className="notfound">
            <div className="notfound-404">
              <h1>4<span>0</span>1</h1>
            </div>
            <p>Sorry. You do not have permissions to this page. Please contact us at <a href="mailto:newaycare36@gmail.com"> newaycare36@gmail.com</a></p>
            <a className="link" href="/">home page</a>
          </div>
        </div>
        {/* This templates was made by Colorlib (https://colorlib.com) */}
      </div>
      
      
      
    );
  }
}

export default Unauthorized;
