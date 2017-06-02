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
	  this.state = {
      isHomeDisplayed: true,
      areMessagesDisplayed: false
    }
  }

  handleMessagesClick = (e) => {
    this.setState({
      isHomeDisplayed: !this.state.isHomeDisplayed,
      areMessagesDisplayed: !this.state.areMessagesDisplayed
    });
  }

  handleMusicClick = (e) => {
    this.setState({
      isHomeDisplayed: !this.state.isHomeDisplayed,
      areMusicDisplayed: !this.state.areMusicDisplayed
    });
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

    const homeSlider = (
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
    );

    const homeFooter = (
      <div className="menu-bottom">
        <div className="icon-wrapper"><a onClick={this.handleMessagesClick} id="messages"><img className="icon" src={messagesIcon} /></a>
          <a onClick={this.handleMusicClick} id="music"><img className="icon" src={musicIcon} /></a>
        </div>
      </div>
    );

    return (
      <div className="App">
        <div className="nav"></div>

        <div className="wrapper">
          <div className="phone-wrapper">
            <div className="crop">
              {this.state.isHomeDisplayed ? homeSlider : ''}
              {this.state.areMessagesDisplayed ? <Messages closeApp={this.handleMessagesClick}/> : ''}
              {this.state.areMusicDisplayed ? <Messages /> : ''}
            </div>
            <div>
              {this.state.isHomeDisplayed ? homeFooter : ''}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
