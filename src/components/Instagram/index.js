import React, { Component } from 'react';
import { fetchInstagram } from '../../api/instagram';
import AppHeader from '../AppHeader';

export default class Instagram extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataArray: [],
      selectedImageUrl: '',
    };

    this.onPhotoHeaderClick = this.onPhotoHeaderClick.bind(this);
    this.onPhotoClick = this.onPhotoClick.bind(this);
  }

  componentDidMount() {
    fetchInstagram()
    .then((response) => {
      console.log( response.items );
      response.items.splice(-2, 2);

      this.setState({
        dataArray: response.items,
      });
    })
    .catch(err => console.log(`Fetch Images Error: ${err}`));
  }

  onPhotoHeaderClick() {
    this.props.closeApp();
  }

  onPhotoClick(imageUrl) {
    return () => this.setState({ selectedImageUrl: imageUrl });
  }

  renderThumbnails(dataArray) {
    return dataArray.map((data, index) => (
      <div key={index}className="image-crop">
        <a href="javascript:void(0)" onClick={this.onPhotoClick(data.images.standard_resolution.url)}>
          <img src={data.images.standard_resolution.url} role="presentation" alt={data.images.standard_resolution.url} />
        </a>
      </div>
      ));
  }

  renderSelectedImage(imageUrl) {
    return (
      <div role="button" tabIndex={0} className="full-width" onClick={() => this.setState({ selectedImageUrl: '' })}>
        <img src={imageUrl} alt={imageUrl} />
      </div>
    );
  }

  render() {
    return (
      <div className="Photos">
        <AppHeader name="instagram" onHeaderClick={() => this.onPhotoHeaderClick()} />
        <div className="photos-container">
          {
            this.state.selectedImageUrl
              ? this.renderSelectedImage(this.state.selectedImageUrl)
              : this.renderThumbnails(this.state.dataArray)
          }
        </div>
      </div>
    );
  }
}
