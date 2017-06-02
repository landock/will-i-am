import React, { Component } from 'react';
import Slider from 'react-slick'
import Messages from './components/Messages'


import messagesIcon from './images/messages-icon.png';
import musicIcon from './images/music-icon.png';
import twitterIcon from './images/twitter-icon.png';
import facebookIcon from './images/facebook-icon.png';
import instagramIcon from './images/instagram-icon.png';

import './App.css';

class App extends Component {

  constructor(props) {
	  super(props);
	  this.state = {areMessagesDisplayed: false}

  }

  render() {
	/*
	we can probably wrap this shit into a base slider component with these
	as the defaults at some point. then we can swap it out later if react slick sucks
	cuz we have the fucking slider adapter
	*/
    let settings = {
          autoplay:false,
          draggable: true,
          infinite: false,
          arrows: false,
          centerMode: false,
          slidesToShow:1,
          slidesToScroll:1,
          touchMove: false,
    };
    return (
      <div className="App">
		<div className="nav">

		</div>
		<div className="wrapper">
			<div className="phone-wrapper">
				<div className="crop">

					{this.state.areMessagesDisplayed ? <Messages /> : ''}
          {this.state.areMusicDisplayed ? <Messages /> : ''}

					<Slider {...settings} class="slider">
						<div className="screen">
							<div className="icon-wrapper">
								<a onClick={this.handleMessagesClick} id="messages"><img className="icon" src={messagesIcon} /></a>
								<a href="https://twitter.com" target="_blank"><img className="icon" src={twitterIcon} /></a>
								<a href="https://facebook.com" target="_blank"><img className="icon" src={facebookIcon} /></a>
								<a href="https://instagram.com" target="_blank"><img className="icon" src={instagramIcon}/></a>
							</div>
						</div>
						<div className="screen">
							<div className="icon-wrapper">
								<a href="https://twitter.com" target="_blank"><img className="icon" src={twitterIcon} /></a>
								<a href="https://facebook.com" target="_blank"><img className="icon" src={facebookIcon} /></a>
								<a href="https://instagram.com" target="_blank"><img className="icon" src={instagramIcon}/></a>
							</div>
						</div>
					</Slider>

				</div>
				<div className="menu-bottom">
					<div className="icon-wrapper"><a onClick={this.handleMessagesClick} id="messages"><img className="icon" src={messagesIcon} /></a>
            <a onClick={this.handleMusicClick} id="music"><img className="icon" src={musicIcon} /></a>
          </div>

				</div>
			</div>
		</div>
      </div>
    );
  }
handleMessagesClick = (e) => {
	this.setState({areMessagesDisplayed: !this.state.areMessagesDisplayed});
}
handleMusicClick = (e) => {
	this.setState({areMusicDisplayed: !this.state.areMusicDisplayed});
}
}


export default App;
