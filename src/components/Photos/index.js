import React, { Component } from 'react';
import { fetchImages } from '../../api/flickr';

export default class Photos extends Component {
  constructor(props) {
    super(props);

    this.state={
      imageArray: []
    }
  }

  componentDidMount() {
    fetchImages()
    .then((images) => {
      this.setState({
        imageArray: images
      })
    })
    .catch((err) => console.log('Fetch Images Error: ' + err));
  }

  onPhotoHeaderClick = () => {
    this.props.closeApp();
  }

  render() {
      return (
        <div>
          <div onClick={(e)=>this.onPhotoHeaderClick(e)}>
            <div className="tmpHeader"> <div className="arrow">{'<'}</div> <div className="photos-header-cp">Photos</div></div>
          </div>
          <div className="photos">
          {this.state.imageArray.map((image, index) => {
            return(
              <div key={index} className="image-crop">
                <img src={image} alt={image} width="358"/>
              </div>
              );
          })}
          </div>
        </div>
      );
  }
}
