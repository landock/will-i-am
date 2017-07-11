import React, { Component } from 'react';

import AppHeader from '../AppHeader';

import playIcon from '../../images/pause.svg';
import pauseIcon from '../../images/play.svg';
import fastForwardIcon from '../../images/forward.svg';
import audioIcon from '../../images/audio.svg';
import missingArt from '../../images/missing-album-art-icon.png';
import musicFooter from '../../images/music-footer.png';

export default class Music extends Component {
	constructor(props) {
		super(props);

		this.state = {
			currentTrackIndex: 0,
			isPlaying: false,
		};

		this.audioEl = null;

		this.onTrackClick = this.onTrackClick.bind(this);
		this.onPlayClick = this.onPlayClick.bind(this);
		this.onMusicHeaderClick = this.onMusicHeaderClick.bind(this);
		this.onFastForwardClick = this.onFastForwardClick.bind(this);
	}

	componentDidUpdate() {
		if (!this.audioEl) {
			return;
		}

		const isReallyPlaying = this.audioEl.currentTime > 0 && !this.audioEl.paused && !this.audioEl.ended && this.audioEl.readyState > 2;

		if (this.state.isPlaying && !isReallyPlaying) {
			try {
				this.audioEl.play();
			} catch (e) {
				console.log(e);
			}
		} else {
			try {
				this.audioEl.pause();
			} catch (e) {
				console.log(e);
			}
		}
	}

	onMusicHeaderClick() {
		this.props.closeApp();
	}

	onPlayClick() {
		this.setState({
			isPlaying: !this.state.isPlaying,
		});
	}

	onFastForwardClick() {
		const nextIndex = (this.state.currentTrackIndex + 1) % this.props.tracks.length;

		this.setState({
			isPlaying: true,
			currentTrack: this.props.tracks[nextIndex],
			currentTrackIndex: nextIndex
		});
	}

	onTrackClick(track) {
		this.setState({
			isPlaying: true,
			currentTrack: track,
			currentTrackIndex: this.props.tracks.findIndex(x => x.title === track.title),
		});
	}

	render() {
		const { closeApp, tracks } = this.props;
		const trackIsPlaying = this.state.currentTrack && this.state.isPlaying;
		const that = this;

		const trackListing = tracks.map((track) => {
			const isCurrentlyPlayingTrack = that.state.currentTrack && that.state.currentTrack.title === track.title;
			const linearGradient = trackIsPlaying && isCurrentlyPlayingTrack
				? 'linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.5))'
				: 'linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0))';
			const artworkStyle = {
				background: `${linearGradient}, url('${track.artworkUrl}')`,
			};

			return (
				<button className="play-track-btn" key={track.id} onClick={() => this.onTrackClick(track)}>
					<div style={artworkStyle} className="track-art">
						{trackIsPlaying && isCurrentlyPlayingTrack
							// TODO: make most of this styling a class
							? <img
								src={audioIcon} alt={audioIcon} style={{
								width: 'auto',
								height: '20px',
								display: 'block',
								margin: '33% auto 0',
							}}
							/>
							: ''
						}
					</div>
					<div className="track-info">
						<p className="track-title">{track.title}</p>
						<p className="track-artist">{track.artist}</p>
					</div>
				</button>
			);
		});

		const currentlyPlayingOpenClass = this.state.isPlaying
			? 'track-wrapper player-open'
			: 'track-wrapper';

		return (
			<div className="Music">
				<AppHeader title="music" onHeaderClick={() => closeApp()}/>
				<div className={currentlyPlayingOpenClass}>
					{trackListing}
					<audio ref={(audio) => {
						if (!audio) return;
						this.audioEl = audio;
						return this.audioEl.click();
					}}
					       src={this.state.currentTrack && (this.state.currentTrack.streamUrl || this.state.currentTrack.downloadUrl)}/>
				</div>
				{this.state.currentTrack
					? (
						<div className="current-track-player">
							<img alt={this.state.currentTrack.artworkUrl} src={this.state.currentTrack.artworkUrl}/>
							<div className="current-track-title">
								<span>{this.state.currentTrack.title}</span>
							</div>
							<div className="controls">
								<button onClick={this.onPlayClick}>
									<img
										alt={playIcon}
										src={
											!this.state.isPlaying
												? pauseIcon
												: playIcon
										}
										className="play-icon"
									/>
								</button>

								<button onClick={this.onFastForwardClick}>
									<img alt={fastForwardIcon} src={fastForwardIcon} className="fast-forward-icon"/>
								</button>
							</div>
						</div>
					)
					: ''
				}
				<div className="music-footer">
					<img src={musicFooter}/>
				</div>
			</div>
		);
	}
}
