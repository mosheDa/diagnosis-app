import React, { Component } from 'react';
import { Link } from 'react-router';
import { isLoggedIn } from '../utils/AuthService';
import { CloudinaryContext, Transformation, Video } from 'cloudinary-react';
import axios from 'axios';

const CLOUDBINARY_API_ENDPOINT = 'https://videos-diagnosis.herokuapp.com/videos'

class Display extends Component {

  state = { videos: [] };

  getVideos() {
    axios.get(CLOUDBINARY_API_ENDPOINT)
          .then(res => {
            console.log(res.data.resources);
            this.setState({ videos: res.data.resources});
    });
  }

  componentDidMount() {
    this.getVideos();
  }

  render() {

    const { videos }  = this.state;

    return (
      <div>
        <h3 className="text-center"> Latest Videos on Upluad app </h3>
        <hr/>

        <div className="col-sm-12">
          <CloudinaryContext cloudName="dtvoiy5lg">
            { videos.map((data, index) => (
                <div className="col-sm-4" key={index}>
                  <div className="embed-responsive embed-responsive-4by3">
                    <Video publicId={data.public_id} width="50"  controls></Video>
                  </div>
                  <div> Created at {data.created_at} </div>
                </div>
              ))
            }
          </CloudinaryContext>
        </div>
      </div>
    );
  }
}

export default Display;
