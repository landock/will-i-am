import React, { Component } from 'react';

export default class Music extends Component {

  onMusicHeaderClick = () => {
    this.props.closeApp();
  }

	render() {
    return (
      <div>
        <div onClick={(e)=>this.onMusicHeaderClick(e)}>
          <div className="tmpHeader"> <div className="arrow">{'<'}</div> <div className="music-header-cp">Music</div></div>
        </div>
        <iframe
          width="100%"
          height="620"
          scrolling="no"
          frameBorder="no"
          title="music"
          src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/users/20522460&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true"
        />
      </div>
    );
  }
}
