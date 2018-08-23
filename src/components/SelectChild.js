
import React, { Component } from 'react';
import axios from 'axios';
import Nav from './Nav';
import DisplayByName from './DisplayByName';
import history from './history';
import { CloudinaryContext, Transformation, Video } from 'cloudinary-react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CircularProgress from '@material-ui/core/CircularProgress';

const CLOUDBINARY_API_ENDPOINT = 'https://videos-diagnosis.herokuapp.com/users'
// const CLOUDBINARY_API_ENDPOINT = 'http://localhost:3001/users'



class SelectChild extends Component {

  state = { users: [], expertName:"",  loading: true };

  getUsers() {
    axios.get(CLOUDBINARY_API_ENDPOINT)
          .then(res => {
            this.setState({ ...this.state, users: res.data, loading: false});    
    });
  }

  componentWillMount() {
    // const expertName = localStorage.getItem("username");
    const expertName = ""
    
    this.setState({ ...this.state, expertName});
    
    this.getUsers();
  }

  handleClick(e){
    // history.push(`/name/${e.currentTarget.value}`);
    history.push(`/name/${e.userData.userName}`);
    
  }

  render() {
    const styles = {
      card: {
        width:300,
        height: 300,
        margin: 1
      },
      // media: {
      //   height: 140,
      // },
      title: {
        marginBottom: 16,
        fontSize: 14,
      },
      progress:{
        position: "fixed", /* or absolute */
        top: "50%",
        left: "50%",
      }
    };

    const { users ,expertName, loading}  = this.state;
  
    return (
 loading?  
 <CircularProgress style={styles.progress} size={100} />: <div >
     <div >
          <CloudinaryContext cloudName="dtvoiy5lg">
          <Grid container spacing={16}>
            { users.map((userData, index) => (
              <Grid item key={index} sm={6} md={4} lg={3}>
               <Card style={styles.card}>
               {/* <CardContent>
                 <Typography component="p">
                 {userData.userName} ({userData.videosCount})
                 </Typography>
               </CardContent> */}
                    <CardHeader
                avatar={
                  <Avatar aria-label="Recipe">
                      R 
                  </Avatar>
                } 
                action={
                  <IconButton>
                    <MoreVertIcon />
                  </IconButton>
                }
                title=  {userData.userName} 
                subheader= {`${userData.videosCount} videos`}/>
               {/* <CardMedia
                 className={styles.media}
                 image="/static/images/cards/contemplative-reptile.jpg"
                 title="Contemplative Reptile"
               /> */}
               
                 <Video width="250px" height="170px" publicId={userData.userVideoImage} >
                 </Video>
              
               <CardActions>
                 <Button onClick={()=>{this.handleClick({userData}) } } size="small" color="primary">
                   Open diagnosis page
                 </Button>
                
               </CardActions>
             </Card>
             </Grid>
              ))
            }
            </Grid>
          </CloudinaryContext>
        </div>
      </div>
      
    );
  }
}

export default SelectChild;