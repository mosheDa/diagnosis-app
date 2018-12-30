import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import history from './history';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import HomeIcon from '@material-ui/icons/Home';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import LoginIcon from '@material-ui/icons/PowerSettingsNew';

const styles = {
  root: {
    flexGrow: 1,
    marginBottom: 9
  },
  flex: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class MenuAppBar extends React.Component {
  state = {
    auth: true,
    anchorEl: null,
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  homeRef = () =>{
    history.push('/');
    this.handleClose();
  }
  selectRef = () => {
    history.push('/select');
    this.handleClose();    
  }

  renderSwitch(loaction) {
    switch(loaction) {
      case '/':
        return <span>Home</span>;
      case '/select':
        return <span>Diagnosis</span>;
      default:
        return  <span>{loaction.split("/")[2]}</span>;
    }
  }

  render() {
    const { isLoggedIn, login, logout } = this.props.auth;

    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const sideList = (
      <div className={classes.list}>
         <div className={classes.root}>
         <List component="nav">
           <ListItem component="a" href="/">
             <ListItemIcon>
               <HomeIcon />
             </ListItemIcon>
             <ListItemText primary="Home" />
           </ListItem>
           <ListItem component="a" href="/select">
             <ListItemIcon>
               <BorderColorIcon />
             </ListItemIcon>
             <ListItemText primary="Diagnosis" />
           </ListItem>
         </List>
         <Divider />
         <List component="nav">
         {
           (!isLoggedIn()) ?
         <ListItem button onClick={() => login()}>
            <ListItemIcon>
               <LoginIcon />
             </ListItemIcon>
             <ListItemText primary="Login" />
           </ListItem>: 
          ( <ListItem button  onClick={() => logout()}>
            <ListItemIcon>
                <LoginIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
           </ListItem>)
         }
         </List>
       </div>
      </div>
    );

    return (
      <div className={classes.root}>
        {/* <FormGroup>
          <FormControlLabel
            control={
              <Switch checked={auth} onChange={this.handleChange} aria-label="LoginSwitch" />
            }
            label={auth ? 'Logout' : 'Login'}
          />
        </FormGroup> */}
        <AppBar position="static">
          <Toolbar>
            <IconButton
                  aria-owns={open ? 'menu-appbar' : null}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                  className={classes.menuButton}
                >
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" className={classes.flex}>
               {this.renderSwitch(history.location.pathname)}
             
            </Typography>
              <div>
                {/* <IconButton
                  aria-owns={open ? 'menu-appbar' : null}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton> */}
                <Drawer open={open} onClose={this.handleClose}>
                  <div
                    tabIndex={0}
                    role="button"
                    onClick={this.handleClose}
                    onKeyDown={this.handleClose}
                  >
                    {sideList}
                  </div> 
                </Drawer> 
              </div>
           
          {
          //    (isLoggedIn()) ?
          //    <Button variant="contained" color="secondary" onClick={() => logout() }>Log out </Button>
          //    : (  
          //       <Button variant="contained" color="primary"  onClick={() => login()}   >
          //    Login
          //  </Button>
          //   )
           }
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}


MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuAppBar);