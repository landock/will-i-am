import React, { Component } from 'react';

import AppHeader from '../AppHeader';

import playIcon from '../../images/pause.svg';
import pauseIcon from '../../images/play.svg';
import fastForwardIcon from '../../images/forward.svg';
import audioIcon from '../../images/audio.svg';
import missingArt from '../../images/missing-album-art-icon.png';

export default class Music extends Component {
	constructor(props) {
		super(props);

		this.state = {
			audioUrl: '',
			isPlaying: false
		};

		this.audioEl = null;

		this.onTrackClick = this.onTrackClick.bind(this);
		this.handlePlayClick = this.handlePlayClick.bind(this);
		this.onMusicHeaderClick = this.onMusicHeaderClick.bind(this);
	}

	componentDidUpdate() {
		if (!this.audioEl) return;

		let isReallyPlaying = this.audioEl.currentTime > 0 && !this.audioEl.paused && !this.audioEl.ended && this.audioEl.readyState > 2;

		if (this.state.isPlaying && !isReallyPlaying) {
			try {
				this.audioEl.play();
			}
			catch (e) {
				console.log(e)
			}
		} else {
			try {
				this.audioEl.pause();
			}
			catch (e) {
				console.log(e)
			}
		}
	}

  onMusicHeaderClick() {
    this.props.closeApp();
  }

	handlePlayClick() {
		this.setState({ isPlaying: !this.state.isPlaying });
	}

	onTrackClick(track) {
		this.setState({
				audioUrl: track.streamUrl || track.downloadUrl,
			isPlaying: true,
			currentTrackArtwork: track.artworkUrl || missingArt,
				currentTrackTitle: track.title,
			}
		)
	}

	render() {
		const { closeApp, tracks } = this.props;
		const player = tracks.map(track => {
			const linearGradient = this.state.currentTrackTitle === track.title && this.state.isPlaying
				? 'linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.5))'
				: 'linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0))';
			const artworkStyle = {
				background: `${linearGradient}, url('${track.artworkUrl}')`,
			};

			return (
				<button className="play-track-btn" key={track.id} onClick={() => this.onTrackClick(track)}>
					<div style={artworkStyle} className="track-art">
						{
							this.state.currentTrackTitle === track.title && this.state.isPlaying
								//TODO: make most of this styling a class
								? <img src={audioIcon} alt={audioIcon}
								       style={{ width: 'auto', height: '20px', display: 'block', margin: '33% auto 0' }}/>
								: ''
						}
					</div>
					<div className="track-info">
						<p className="track-title">{track.title}</p>
						<p className="track-artist">{track.artist}</p>
					</div>
				</button>
			)
		});

		const currentlyPlayingOpenClass = this.state.isPlaying
			? 'track-wrapper player-open'
			: 'track-wrapper';

    return (
      <div className="Music">
	      <AppHeader title="music" onHeaderClick={() => closeApp()}/>
	      <div className={currentlyPlayingOpenClass}>
		      {player}
		      <audio
			      ref=
				      {
					      (audio) => {
						      if (!audio) return;

						      this.audioEl = audio;
						      return this.audioEl.click();
					      }
				      }
			      src={this.state.audioUrl}
		      />
	      </div>
	      {
		      this.state.currentTrackArtwork
			      ? (
				      <div className="current-track-player">
					      <img alt={this.state.currentTrackArtwork} src={this.state.currentTrackArtwork}/>
					      <div className="current-track-title"><span>{this.state.currentTrackTitle}</span></div>
					      <div className="controls">
						      <button onClick={this.handlePlayClick}>
							      <img alt={playIcon} src={!this.state.isPlaying ? pauseIcon : playIcon} className="play-icon"/>
						      </button>
						      <button>
							      <img alt={fastForwardIcon} src={fastForwardIcon} className="fast-forward-icon"/>
						      </button>
					      </div>
				      </div>
			      )
			      : ''
	      }
      </div>
    );
  }
}
