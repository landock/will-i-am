import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import { fetchInstagram } from '../../api/instagram';
import AppHeader from '../AppHeader';

export default class Instagram extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataArray: [],
      selectedItem: '',
      userProfile: {}
    };

    this.onPhotoHeaderClick = this.onPhotoHeaderClick.bind(this);
    this.onThumbnailClick = this.onThumbnailClick.bind(this);
  }

  componentDidMount() {
    fetchInstagram()
    .then((response) => {
      // limit array to 18 items so they all fit in the screen
      response.items.splice(-2, 2);

      this.setState({
        dataArray: response.items,
        userProfile: response.items[0].user
      });
    })
    .catch(err => console.log(`Fetch Images Error: ${err}`));
  }

  onPhotoHeaderClick() {
    this.props.closeApp();
  }

  onThumbnailClick(data) {
    return () => this.setState({ selectedItem: data });
  }

  renderThumbnails(dataArray) {
    return dataArray.map((data, index) => (
      <div key={index}className="image-crop">
        <a href="javascript:void(0)" onClick={this.onThumbnailClick(data)}>
          <img src={data.images.standard_resolution.url} role="presentation" alt={data.images.standard_resolution.url} />
        </a>
      </div>
    ));
  }

  renderSelectedItem(data) {
    if (data.type === "video") {
      return(
        <div role="button" tabIndex={0} className="full-width" onClick={() => this.setState({ selectedItem: '' })}>
          <ReactPlayer url={data.videos.standard_resolution.url} playing width="auto" height="100%"/>
          <div>
            <p><strong>{data.video_views.toLocaleString()}</strong> views</p>
            <p className="sub"><strong>{data.user.username}</strong> {data.caption.text}</p>
          </div>
        </div>
      );
    }

    return (
      <div role="button" tabIndex={0} className="full-width" onClick={() => this.setState({ selectedItem: '' })}>
        <img src={data.images.standard_resolution.url} alt={data.images.standard_resolution.url} />
        <div>
          <p><strong>{data.likes.count.toLocaleString()}</strong> likes</p>
          <p className="sub"><strong>{data.user.username}</strong> {data.caption.text}</p>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="Photos">
        <AppHeader name="instagram" onHeaderClick={() => this.onPhotoHeaderClick()} />
        <div className="instagramHeader">
          <img src={this.state.userProfile.profile_picture} alt={this.state.userProfile.profile_picture} />
          {this.state.userProfile.username}
          <br />
          {this.state.userProfile.full_name}
        </div>
        <div className="photos-container">
          {
            this.state.selectedItem
              ? this.renderSelectedItem(this.state.selectedItem)
              : this.renderThumbnails(this.state.dataArray)
          }
        </div>
      </div>
    );
  }
}
