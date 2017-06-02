import React, { Component } from 'react';

export default class Music extends Component {

  onMusicHeaderClick = () => {
    this.props.closeApp();
  }

	render() {
    return (
      <div>
        <div onClick={(e)=>this.onMusicHeaderClick(e)}>
          <div className="tmpHeader"> {'<'} MUSIC </div>
        </div>
        <iframe
          width="100%"
          height="450"
          scrolling="no"
          frameBorder="no"
          src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/users/20522460&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true"
        />
      </div>
    );
  }
}
