import React, { Component } from 'react';
import AppHeader from '../AppHeader';

const iframeSrcUrl = 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/users/20522460&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true';

export default class Music extends Component {

  onMusicHeaderClick() {
    this.props.closeApp();
  }

  render() {
    return (
      <div className="Music">
	      <AppHeader title="music" onHeaderClick={() => this.onMusicHeaderClick()}/>
        <iframe
          width="100%"
          height="620"
          scrolling="no"
          frameBorder="no"
          title="music"
          src={iframeSrcUrl}
        />
      </div>
    );
  }
}
