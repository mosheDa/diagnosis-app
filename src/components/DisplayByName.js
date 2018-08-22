 import React, { Component } from 'react';
import { Link } from 'react-router';
import Nav from './Nav';
import { isLoggedIn } from '../utils/AuthService';
import { CloudinaryContext, Transformation, Video } from 'cloudinary-react';
import axios from 'axios';
import Modal from 'react-responsive-modal';
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
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FloatGroup from 'react-float-button';
import AddIcon from '@material-ui/icons/Add';

const CLOUDBINARY_API_ENDPOINT = 'https://videos-diagnosis.herokuapp.com/videos/';
const USERS_API_ENDPOINT = 'https://videos-diagnosis.herokuapp.com/users/';
const DIAGNOSIS_API_ENDPOINT = 'https://videos-diagnosis.herokuapp.com/diagnosis/';

class DisplayByName extends Component {

  state = {  open: false, videos: [], result:"", loading: true };

  getVideos(username) {
    axios.get(CLOUDBINARY_API_ENDPOINT + username)
          .then(res => {
            this.setState({ loading: false, videos: res.data.resources.map(resource=>{
              let videoData = resource &&  resource.context && resource.context.custom && 
                resource.context.custom.data;
              
              if(videoData) videoData = JSON.parse(resource.context.custom.data)
              return{
                ...resource, videoData
              }
            })});
    });
  }

  getDiagnosis(username) {
    axios.get(USERS_API_ENDPOINT + username)
          .then(res => {
            this.setState({ dignosis: res.data, result:res.data.result});
    });
  }

  componentWillMount() {
    this.getVideos(this.props.match.params.username);
    this.getDiagnosis(this.props.match.params.username);
    this.setState({...this.state, username: this.props.match.params.username });
  }

  handleClickOpen = () => {
    this.setState({...this.state, open: true });
  };

  handleClose = () => {
    this.setState({ ...this.state, open: false });
  };

  onUpdateInputValue = (e) => {
    this.setState({ ...this.state, result: e.target.value });
  };

  onSubmit = () => {
    const data = {result:this.state.result}
    const url = DIAGNOSIS_API_ENDPOINT + this.state.dignosis._id;
    axios.put(url, data)
    .then(res => {
      this.setState({ ...this.state, open: false });
    })
    .catch(err => {
      console.err(err)
      alert("fail")
    });
  };

  render() {
    const styles = {
      card: {
        width:300,
        height: 300,
        margin: 1
      },
      title: {
        marginBottom: 16,
        fontSize: 14,
      },
      progress:{
        position: "fixed", /* or absolute */
        top: "50%",
        left: "50%",
      },
      addButton:{
        position: "fixed",
        right: 10,
        bottom: 10,
        width: 100,
        height: 100,
      }
    };


    const { videos, open, username, loading }  = this.state;

    return (
      loading?  
      <CircularProgress style={styles.progress} size={100} />:
      <div >
       
       <div>
       <Button variant="fab" color="secondary" style={styles.addButton} onClick={this.handleClickOpen} aria-label="Add" >
          <AddIcon />
       </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
        
        <div style={{width: 500}}>
          <DialogTitle id="form-dialog-title">Diagnosis</DialogTitle>
          <DialogContent>
            
            {/* <DialogContentText>
              fill diagnosis data.
            </DialogContentText> */}

            <TextField
            InputLabelProps={{
                shrink: true,
              }}
              multiline={true}
              rows={1}
              rowsMax={10}
              value={this.state.result}
              placeholder="Dignosis"
              helperText=" fill diagnosis data..."
              fullWidth
              autoFocus
              onChange={this.onUpdateInputValue}
            />  
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.onSubmit} color="primary">
              Save
            </Button>
          </DialogActions>
           </div>    
        </Dialog>
      </div>
      <CloudinaryContext cloudName="dtvoiy5lg">
      <Grid container spacing={16}>
        { videos.map((video, index) => (
          <Grid item key={index} sm={6} md={4} lg={3}>
           <Card style={styles.card}>      
             <Video controls width="250px" height="170px" publicId={video.public_id} >
             </Video>
             <CardContent>
             <Typography component="p">
             <div> {new Date(video.created_at).toDateString()}</div>                 
                 
                 {video.videoData && video.videoData.age ?  <div> Age: {video.videoData.age} </div>                      
                  : ""}
                   {video.videoData && video.videoData.videoInfo ?
                     <div> Note: {video.videoData.videoInfo}</div>  
                      : ""}
                  Risk level: 5 <br/>
                  Risk score: 5 <br/>                  
  
             </Typography>
           </CardContent>
          
           <CardActions>
             {/* <Button onClick={()=>{this.handleClick({userData}) } } size="small" color="primary">
               Open diagnosis page
             </Button> */}
            
           </CardActions>
         </Card>
         </Grid>
          ))
        }
        </Grid>
      </CloudinaryContext>      
    </div>
    );
  }
}

export default DisplayByName;
