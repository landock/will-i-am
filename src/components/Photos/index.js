import React, { Component } from 'react';
import { fetchImages } from '../../api/flickr';

export default class Photos extends Component {
  constructor(props) {
    super(props);

    this.state={
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
        <div>
          <div onClick={(e)=>this.onPhotoHeaderClick(e)}>
            <div className="tmpHeader"> <div className="arrow">{'<'}</div> <div className="photos-header-cp">Photos</div></div>
          </div>
          <div className="photos">
		  {this.state.selectedImageUrl ? this.renderSelectedImage(this.state.selectedImageUrl)  : this.renderThumbnails(this.state.imageArray) }
          </div>
        </div>
      );
  }

  renderThumbnails = (images) => {
          return images.map((image, index) => {
            return(
				<div key={index}className="image-crop">
					<a onClick={this.onPhotoClick(image)} href={void(0)}>
					  	<img src={image} alt={image} width="358"/>
					</a>
	            </div>
            );
		});

  }

  renderSelectedImage = (imageUrl) => {
	  return (
		  <div className="full-width" onClick={() => this.setState({selectedImageUrl: ''})}>
			  <img src={imageUrl} alt={imageUrl} />
		  </div>
	  )
  }
}
