import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group'

// services
import { fetchImages } from '../../api/flickr';
import { fetchMessages } from '../../api/messages';
import { fetchInstagram } from '../../api/instagram';
import { fetchTracksFromPlaylist } from '../../api/soundcloud';
import { fetchEvents } from '../../api/calendar';
import { fetchNews } from '../../api/news';

import IframeWrapper from '../IframeWrapper';
import Instagram from '../Instagram';
import Twitter from '../Twitter';
import Calendar from '../Calendar';
import Photos from '../Photos';
import Messages from '../Messages';
import Music from '../Music';
import News from '../News';
import TermsAndConditions from '../LegalFooter/TermsAndConditions';
import PrivacyPolicy from '../LegalFooter/PrivacyPolicy';

export default class AppSwitcher extends Component {
	constructor(props) {
		super(props);

		this.state = {
			media: [],
			tracks: [],
			news: [],
			events: [],
			instagramMedia: [],
			userProfile: null,
			conversations: [],
		};

		this.illIAmUrl = 'https://ill.i.am/';
		this.facebookUrl = 'https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fwilliam%2F&tabs=timeline&width=360&height=560&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=false&appId=263980326955302';
		this.iamPlusUrl = 'https://iamplus.com';
		this.iamAngelUrl = 'http://iamangelfoundation.org/';

	}

	componentDidMount() {
		fetchImages()
			.then(mediaUrls => this.setState({ media: mediaUrls }));

		fetchMessages()
			.then(conversations => this.setState({ conversations }));

		fetchTracksFromPlaylist()
			.then(tracks => this.setState({ tracks }));

		fetchInstagram()
			.then((response) => {
				response.items.splice(-2, 2); // limit array to 18 items so they all fit in the screen

				return this.setState({
					instagramMedia: response.items,
					userProfile: response.items[0].user,
				});
			})

		fetchNews()
			.then(news => this.setState({ news }));

		fetchEvents()
			.then(events => this.setState({ events }));
	}

	render() {
		const renderApp = (appName) => {
			switch (appName) {
				case 'facebook':
					return (
						<IframeWrapper
							key={0}
							title={appName}
							appClassName="Facebook"
							showFooter={false}
							iframeUrl={this.facebookUrl}
						/>
					);
					break;

				case 'twitter':
					return <Twitter key={1} />;
					break;

				case 'instagram':
					return (
						<Instagram
							key={2}
							media={this.state.instagramMedia}
							userProfile={this.state.userProfile}
						/>
					);
					break;

				case 'photos':
					return (
						<Photos
							key={3}
							media={this.state.media}
						/>
					);
					break;

				case 'messages':
					return (
						<Messages
							key={4}
							conversations={this.state.conversations}
						/>
					);
					break;

				case 'calendar':
					return (
						<Calendar
							key={5}
							events={this.state.events}
							conversations={this.state.conversations}
						/>
					);
					break;

				case 'music':
					return (
						<Music
							key={6}
							tracks={this.state.tracks}
						/>
					);
					break;

				case 'ill':
					return (
						<IframeWrapper
							title="ill.i.am"
							appClassName={appName}
							key={7}
							showFooter={true}
							iframeUrl={this.illIAmUrl}
						/>
					);
					break;

				case 'plus':
					return (
						<IframeWrapper
							title="Iam+"
							appClassName="plus"
							key={8}
							showFooter={true}
							iframeUrl={this.iamPlusUrl}
						/>
					);
					break;

				case 'angel':
					return (
						<IframeWrapper
							title="I.AM.ANGEL Foundation"
							appClassName="angel"
							key={8}
							showFooter={true}
							iframeUrl={this.iamAngelUrl}
						/>
					);
					break;
				case 'news':
					return (
						<News
							title="News"
							appClassName="news"
							key={9}
							newsItems={this.state.news}
						/>
					);
					break;

				case 'terms':
					return <TermsAndConditions key={10} /> ;
					break;

				case 'privacy':
					return <PrivacyPolicy key={11} /> ;
					break;

				default:
					return null;
			}
		};

		return (
			<div className="AppSwitcher" style={{ zIndex: 2 }}>
				<CSSTransitionGroup
					transitionName="flash"
					transitionEnterTimeout={300}
					transitionLeaveTimeout={300}
					component="div"
				>
					{renderApp(this.props.currentApp)}
				</CSSTransitionGroup>
			</div>
		);
	}
}
