import React, { Component } from 'react';
import ReactPlayer from 'react-player';

import AppHeader from '../AppHeader';
import playIcon from '../../images/play.svg';
import fastForwardIcon from '../../images/forward.svg';

export default class Music extends Component {
	constructor(props) {
		super(props);

		this.state = { audioUrl: '' };
		this.onTrackClick = this.onTrackClick.bind(this);
	}

  onMusicHeaderClick() {
    this.props.closeApp();
  }

	onTrackClick(track) {
		console.log(track);

		this.setState({
			audioUrl: track.streamUrl,
			currentTrackArtwork: track.artworkUrl,
			currentTrackTitle: track.title
		})
	}

	render() {
		const { closeApp, tracks } = this.props;
		const player = tracks.map(track => (
			<button className="play-track-btn" key={track.id} onClick={() => this.onTrackClick(track)}>
				<img src={track.artworkUrl}/>
				<span className="track-title">{track.title}</span>
				<br/>
				<span className="track-artist">{track.artist}</span>
				{
					this.state.audioUrl
						? <ReactPlayer onEnded={() => this.setState({ audioUrl: '' })} url={this.state.audioUrl} height="0px"
						               playing/>
						: ''
				}
			</button>

		));
    return (
      <div className="Music">
	      <AppHeader title="music" onHeaderClick={() => closeApp()}/>
	      <div className="track-wrapper">
		      {player}
	      </div>
	      {
		      this.state.currentTrackArtwork
			      ? (
				      <div className="current-track-player">
					      <img src={this.state.currentTrackArtwork}/>
					      <span className="current-track-title">{this.state.currentTrackTitle}</span>
					      <div className="controls">
						      <img src={playIcon} className="play-icon"/>
						      <img src={fastForwardIcon} className="fast-forward-icon"/>
					      </div>
				      </div>
			      )
			      : ''
	      }
      </div>
    );
  }
}
