import React, { Component } from 'react';
import Slider from 'react-slick';

import AppTile from './components/AppTile';
import CalendarIcon from './components/Calendar/CalendarIcon';
import TimeHeader from './components/TimeHeader';
import LegalFooter from './components/LegalFooter';

// image imports
import illIcon from './images/ill-icon.png';
import iamIcon from './images/iam-icon.png';
import angelIcon from './images/angel-icon.png';
import facebookIcon from './images/facebook-icon.png';
import twitterIcon from './images/twitter-icon.png';
import instagramIcon from './images/instagram-icon.png';
import messagesIcon from './images/messages-icon.png';
import musicIcon from './images/music-icon.png';
import photosIcon from './images/photos-icon.png';
import newsIcon from './images/news-icon.png';

import './App.css';

const settings = {
	autoplay: false,
	draggable: true,
	infinite: false,
	arrows: false,
	centerMode: false,
	slidesToShow: 1,
	slidesToScroll: 1,
	touchMove: false,
};

export default class App extends Component {

	render() {

		const {isHomeDisplayed, onHomeClick} = this.props;

		const openClass = isHomeDisplayed ? '' : ' open';

		const homeSlider = isHomeDisplayed && (
			<Slider
				 {...settings}
				className="slider"
			>
				<div className="screen">
					<div className="icon-wrapper">
						<AppTile title="facebook" imgSrc={facebookIcon} />
						<AppTile title="twitter" imgSrc={twitterIcon} />
						<AppTile title="instagram" imgSrc={instagramIcon} />
            <AppTile title="photos" imgSrc={photosIcon} />
            <AppTile title="plus" imgSrc={iamIcon} />
						<AppTile title="ill" imgSrc={illIcon} />
						<AppTile title="angel" imgSrc={angelIcon} />
					</div>
				</div>
				<div className="screen">
					<div className="icon-wrapper" />
				</div>
			</Slider>
		);

		const homeFooter = isHomeDisplayed && (
			<div className="menu-bottom">
				<div className="icon-wrapper">
					<AppTile title="messages" imgSrc={messagesIcon} />
					<AppTile title="calendar" imgComponent={(<CalendarIcon />)} />
          <AppTile title="news" imgSrc={newsIcon} />
					<AppTile title="music" imgSrc={musicIcon} />
				</div>
			</div>
		);

    let cropClass = `crop ${openClass}`;
		return (
			<div className="App">
				<div className="nav">
					<div className="wrapper">
						<div className="essential-bg">
							<div className="phone-wrapper">
								<div className={cropClass}>
									<div className="crop-container">
										<TimeHeader isHomeDisplayed={this.props.isHomeDisplayed} />
										{/* Home Screen */}
										{this.props.children}
										{homeSlider}

										{/* Footer */}
										{homeFooter}
									</div>
								</div>
								<button className="home-btn" onClick={onHomeClick}>Close</button>
							</div>
              <LegalFooter/>
						</div>
					</div>
      </div>
			</div>
		);
	}
}

