import React, { Component } from 'react';
import ReactPlayer from 'react-player';

import { fetchImages } from '../../api/flickr';
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
  }

  componentDidMount() {
    fetchImages()
    .then((mediaUrls) => {
      this.setState({
        media: mediaUrls,
      });
    })
    .catch(err => console.log(`Fetch Images Error: ${err}`));
  }

  onPhotoHeaderClick() {
    this.props.closeApp();
  }

  onPhotoClick(mediaData) {
    return () => this.setState({
      selectedMedia: mediaData,
    });
  }

  renderThumbnails(images) {
    if (!images) {
      return false;
    }
    return images.map((image, index) => (
      <div key={index} className="image-crop">
        <a role="button" tabIndex={0} onClick={this.onPhotoClick(image)}>
          <img src={image.url} role="presentation" alt={image.url} />
        </a>
      </div>
      ));
  }

  renderSelectedImage(mediaData) {
    const player = <ReactPlayer url={mediaData.videoUrl} height="auto" width="100%" playing />;
    const imageContainer = (<img src={mediaData.url} alt={mediaData.url} />);

    if (!mediaData) return;

    return (
      <div role="button" tabIndex={0} className="full-width" onClick={() => this.setState({ selectedMedia: null })}>
        {mediaData.type === 'video' ? player : imageContainer}
      </div>
    );
  }

  render() {
    return (
      <div className="Photos">
        <AppHeader name="photos" onHeaderClick={() => this.onPhotoHeaderClick()} />
        <div className="photos-container">
          {
            this.state.selectedMedia
              ? this.renderSelectedImage(this.state.selectedMedia)
              : this.renderThumbnails(this.state.media)
          }
        </div>
      </div>
    );
  }
}
