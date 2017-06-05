import React, { Component } from 'react';
import { fetchImages } from '../../api/flickr';
import Modal from 'react-modal';

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
	  let selectedImageUrl = this.state.selectedImageUrl;
      return (
        <div>
          <div onClick={(e)=>this.onPhotoHeaderClick(e)}>
            <div className="tmpHeader"> <div className="arrow">{'<'}</div> <div className="photos-header-cp">Photos</div></div>
          </div>
          <div className="photos">
          {this.state.imageArray.map((image, index) => 	{
            return(

				<div key={index}>
              <div  className="image-crop">
                  <a onClick={this.onPhotoClick(image)}>
				  	<img src={image} alt={image} width="358"/>
					</a>
              </div>
			  {selectedImageUrl ? this.renderSelectedImage(selectedImageUrl) : ''}
				</div>
            );
          })}
          </div>
        </div>
      );
  }

  renderSelectedImage = (imageUrl) => {
	  return (
		  <div>
			  <img src={imageUrl} alt={imageUrl} />
		  </div>
	  )
  }
}
