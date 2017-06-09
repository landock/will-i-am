import React, { Component } from 'react';
import ReactPlayer from 'react-player';

import AppHeader from '../AppHeader';

export default class Instagram extends Component {
  constructor(props) {
    super(props);

    this.state = { selectedItem: '' };

    this.onPhotoHeaderClick = this.onPhotoHeaderClick.bind(this);
    this.onThumbnailClick = this.onThumbnailClick.bind(this);
  }

  onPhotoHeaderClick() {
    this.props.closeApp();
  }

  onThumbnailClick(data) {
    return () => this.setState({ selectedItem: data });
  }

  renderThumbnails(dataArray) {
    return dataArray.map((data, index) => (
      <div key={index} className="image-crop">
        <a role="button" tabIndex={0} onClick={this.onThumbnailClick(data)}>
          <img
            src={data.images.standard_resolution.url}
            role="presentation"
            alt={data.images.standard_resolution.url}
          />
        </a>
      </div>
    ));
  }

  renderSelectedItem(data) {
    if (data.type === 'video') {
      return (
        <div role="button" tabIndex={0} className="full-width" onClick={() => this.setState({ selectedItem: '' })}>
          <ReactPlayer url={data.videos.standard_resolution.url} playing width="auto" height="100%" />
          <div>
            <p className="user-count"><strong>{data.video_views.toLocaleString()}</strong> views</p>
            <p className="sub"><strong>{data.user.username}</strong> {data.caption.text}</p>
          </div>
        </div>
      );
    }

    return (
      <div role="button" tabIndex={0} className="full-width" onClick={() => this.setState({ selectedItem: '' })}>
        <img src={data.images.standard_resolution.url} alt={data.images.standard_resolution.url} />
        <div>
          <p className="user-count"><strong>{data.likes.count.toLocaleString()}</strong> likes</p>
          <p className="sub"><strong>{data.user.username}</strong> {data.caption.text}</p>
        </div>
      </div>
    );
  }

  render() {
    const { userProfile } = this.props;

    return (
      <div className="Photos">
        <AppHeader name="instagram" onHeaderClick={() => this.onPhotoHeaderClick()} />
        <div className="instagramHeader">
          <div className="profile-info">
            <img src={userProfile.profile_picture} alt={userProfile.profile_picture} />
            <p><strong>{userProfile.full_name}</strong></p>
          </div>
          <div className="profile-stats">
            <div className="count">
            <p><strong>63</strong></p><p className="follow-count">posts</p>
            </div>
            <div className="count">
            <p><strong>893K</strong></p><p className="follow-count">followers</p>
            </div>
            <div className="count">
            <p><strong>681</strong></p><p className="follow-count">following</p>
            </div>
            <div className="follow-btn">
            <a href="https://www.instagram.com/iamwill/" target="_blank">Follow</a>
            </div>
          </div>
        </div>
        <div className="instagram-wrapper">
          <div className="photos-container">
            {
              this.state.selectedItem
                ? this.renderSelectedItem(this.state.selectedItem)
                : this.renderThumbnails(this.props.media)
            }
          </div>
        </div>
      </div>
    );
  }
}
