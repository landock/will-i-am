import React, { Component } from 'react';
import ReactPlayer from 'react-player';

import AppFrame from '../AppFrame';

import imgPhotoFooter from '../../images/photos-footer.svg';

export default class Photos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedMedia: null,
    };

    this.onPhotoHeaderClick = this.onPhotoHeaderClick.bind(this);
    this.onPhotoClick = this.onPhotoClick.bind(this);
    this.onClosePhotoClick = this.onClosePhotoClick.bind(this);
  }

  onPhotoHeaderClick() {
    this.props.closeApp();
  }

  onPhotoClick(mediaData) {
    return () => this.setState({
      selectedMedia: mediaData,
    });
  }

  onClosePhotoClick() {
    this.setState({ selectedMedia: null });
  }

  renderThumbnails(images) {
    if (images.length === 0) {
      return (<h4 className="unavailable">Sorry, photos currently unavailable</h4>);
    }
    return images.map((image, index) => (
      <div key={index} className="image-crop">
      <a role="button" tabIndex={0} onClick={this.onPhotoClick(image)}>
      <img src={image.smallUrl} role="presentation" alt={image.smallUrl} />
      </a>
      </div>
    ));
  }

  renderSelectedImage(mediaData) {
    if (!mediaData) return;

    const player = <ReactPlayer url={mediaData.videoUrl} height="auto" width="100%" playing />;
    const imageContainer = <img src={mediaData.largeUrl} alt={mediaData.largeUrl} />;

    return (
      <div
	role="button"
	tabIndex={0}
	className="full-width"
	onClick={this.onClosePhotoClick}
      >
	{mediaData.type === 'video' ? player : imageContainer}
      </div>
    );
  }

  render() {
    const { media } = this.props;
    const { selectedMedia} = this.state;

    return (
      <AppFrame
	appClassName="Photos"title="All Photos"
	onHeaderClick={this.props.onHeaderClick}
      >
	<div className="photos-container">
	  { this.renderThumbnails(media)}
	  { this.renderSelectedImage(selectedMedia) }
	  <div className="photo-footer">
	    <img alt={imgPhotoFooter} src={imgPhotoFooter} />
	  </div>
	</div>
      </AppFrame>
    );
  }
}
