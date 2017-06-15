import React, { Component } from 'react';
import ReactPlayer from 'react-player';

import imgPhotoFooter from '../../images/photos-footer.png';

import AppHeader from '../AppHeader';

export default class Photos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      media: [],
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
    if (!images) {
      return false;
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
    const player = <ReactPlayer url={mediaData.videoUrl} height="auto" width="100%" playing />;
    const imageContainer = <img src={mediaData.largeUrl} alt={mediaData.largeUrl} />;

    if (!mediaData) return;

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
      <div className="Photos">
	      <AppHeader title="all photos" onHeaderClick={this.onPhotoHeaderClick}/>
        <div className="photos-container">
          {
            selectedMedia
              ? this.renderSelectedImage(selectedMedia)
              : this.renderThumbnails(media)
          }
          <div className="photo-footer">
            <img alt={imgPhotoFooter} src={imgPhotoFooter} />
          </div>
        </div>
      </div>
    );
  }
}
