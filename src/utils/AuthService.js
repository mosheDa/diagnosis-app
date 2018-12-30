import decode from 'jwt-decode';
// import { browserHistory } from 'react-router';
import auth0 from 'auth0-js';
import history from "../components/history.js";
const ID_TOKEN_KEY = 'id_token';
const ACCESS_TOKEN_KEY = 'access_token';

const CLIENT_ID = 'JZD3ZrH4oQgqNyF19Sb8cDmF5HZAgVY2';
const CLIENT_DOMAIN = 'uploadapp.eu.auth0.com';
const REDIRECT = 'http://localhost:3000/callback';
const SCOPE = 'full:access';
const AUDIENCE = '';

export default class Auth {
  accessToken;
  idToken;
  expiresAt;
  userProfile;
  scopes;
  groups
  requestedScopes = 'full:diagnosis';

  auth0 = new auth0.WebAuth({
    domain: CLIENT_DOMAIN,
    clientID: CLIENT_ID,
    redirectUri: REDIRECT,
    audience: AUDIENCE,
    responseType: 'token id_token',
    scope: 'openid profile email'
  });

  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    // this.userHasScopes = this.userHasScopes.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
    this.getIdToken = this.getIdToken.bind(this);
    this.renewSession = this.renewSession.bind(this);
    this.getProfile = this.getProfile.bind(this);
    this.isLoggedIn = this.isLoggedIn.bind(this);

  }

  login() {
    this.auth0.authorize();
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        history.replace('/');
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  getAccessToken() {
    return this.accessToken || localStorage.getItem('accessToken');
  }

  isLoggedIn(){
    return this.accessToken || localStorage.getItem('accessToken');
  }

  getIdToken() {
    return this.idToken;
  }

  setSession(authResult) {
    var d = (decode(authResult.idToken))
    console.log(d)
    
    // Set the time that the access token will expire at
    let expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
    this.accessToken = authResult.accessToken;
    this.idToken = authResult.idToken;
    this.expiresAt = expiresAt;
    this.groups = authResult.idTokenPayload['https://diagnosis/user_authorization'].groups

    // Set the users scopes
    // this.scopes = authResult.scope || this.requestedScopes || '';
    
    localStorage.setItem('accessToken',  authResult.accessToken);
    localStorage.setItem('idToken',  authResult.idToken);
    // localStorage.setItem('scopes',  this.scopes);
    localStorage.setItem('groups',  this.groups);

    // navigate to the home route
    history.replace('/select');
  }

  renewSession() {
    this.auth0.checkSession({}, (err, authResult) => {
       if (authResult && authResult.accessToken && authResult.idToken) {
         this.setSession(authResult);
       } else if (err) {
         this.logout();
         console.log(err);
         alert(`Could not get a new token (${err.error}: ${err.error_description}).`);
       }
    });
  }

  getProfile(cb) {
    this.auth0.client.userInfo(this.accessToken, (err, profile) => {
      if (profile) {
        this.userProfile = profile;
      }
      cb(err, profile);
    });
  }

  logout() {
    // Remove tokens and expiry time
    this.accessToken = null;
    this.idToken = null;
    this.expiresAt = 0;

    // Remove user scopes
    this.scopes = null;

    // Remove user profile
    this.userProfile = null;

    // Remove isLoggedIn flag from localStorage
    localStorage.clear();

    // navigate to the home route
    history.replace('/');
  }

  isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = this.expiresAt;
    return new Date().getTime() < expiresAt;
  }

  userInGroup(groups) {
    const grantedGroups = this.groups || localStorage.getItem('groups')
    return groups.every(group => grantedGroups.includes(group));
  }
  // userHasScopes(scopes) {
  //   const currentScopes = this.scopes || localStorage.getItem('scopes')
  //   const grantedScopes = currentScopes.split(' ');
  //   return scopes.every(scope => grantedScopes.includes(scope));
  // }
}