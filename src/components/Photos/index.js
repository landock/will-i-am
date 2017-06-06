import React, { Component } from 'react';
import { fetchImages } from '../../api/flickr';
import AppHeader from '../AppHeader';

export default class Photos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imageArray: [],
		  selectedImageUrl: ''
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

  onPhotoClick = (imageUrl) => {
	  return () => this.setState({selectedImageUrl: imageUrl })
  }

  render() {
      return (
        <div className="Photos">
				  <AppHeader name="photos" onHeaderClick={() => this.onPhotoHeaderClick()} />
          <div className="photos-container">
				  {this.state.selectedImageUrl ? this.renderSelectedImage(this.state.selectedImageUrl) : this.renderThumbnails(this.state.imageArray)}
          </div>
        </div>
      );
  }

  renderThumbnails = (images) => {
		return images.map((image, index) => (
				<div key={index}className="image-crop">
					<a href="javascript:void(0)" onClick={this.onPhotoClick(image)}>
					  	<img src={image} role="presentation" />

					</a>
        </div>
      ));
  }

  renderSelectedImage = (imageUrl) => {
	  return (
		  <div className="full-width" onClick={() => this.setState({selectedImageUrl: ''})}>
			  <img src={imageUrl} alt={imageUrl} />
		  </div>
	  )
  }
}
