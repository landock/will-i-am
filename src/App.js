import React, { Component } from 'react';
import Slider from 'react-slick';
import Messages from './components/Messages';
import Music from './components/Music';
import Photos from './components/Photos';

import messagesIcon from './images/messages-icon.png';
import musicIcon from './images/music-icon.png';
import twitterIcon from './images/twitter-icon.png';
import facebookIcon from './images/facebook-icon.png';
import instagramIcon from './images/instagram-icon.png';
import photosIcon from './images/photos-icon.png';
import illIcon from './images/ill-icon.png';
import iamIcon from './images/iam-icon.png';
import angelIcon from './images/angel-icon.png';

import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isHomeDisplayed: true,
      areMessagesDisplayed: false,
      isMusicDisplayed: false,
      arePhotosDisplayed: false,
    };

    this.handleMessagesClick = this.handleMessagesClick.bind(this);
    this.handleMusicClick = this.handleMusicClick.bind(this);
    this.handlePhotosClick = this.handlePhotosClick.bind(this);
  }

  handleMessagesClick() {
    this.setState({
      isHomeDisplayed: !this.state.isHomeDisplayed,
      areMessagesDisplayed: !this.state.areMessagesDisplayed,
    });
  }

  handleMusicClick() {
    this.setState({
      isHomeDisplayed: !this.state.isHomeDisplayed,
      isMusicDisplayed: !this.state.isMusicDisplayed,
    });
  }

  handlePhotosClick() {
    this.setState({
      isHomeDisplayed: !this.state.isHomeDisplayed,
      arePhotosDisplayed: !this.state.arePhotosDisplayed,
    });
  }

  render() {
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

    const homeSlider = (
      <Slider {...settings} class="slider">
        <div className="screen">
          <div className="icon-wrapper">
            <a href="http://www.twitter.com/iamwill" target="_blank" rel="noopener noreferrer" >
              <img className="icon" alt="icon" src={twitterIcon} />
            </a>
            <a href="https://www.facebook.com/william" target="_blank" rel="noopener noreferrer">
              <img className="icon" alt="icon" src={facebookIcon} />
            </a>
            <a href="https://instagram.com/iamwill" target="_blank" rel="noopener noreferrer">
              <img className="icon" alt="icon" src={instagramIcon} />
            </a>
            <a role="button" tabIndex={0} onClick={this.handleMusicClick} id="music">
              <img className="icon" alt="icon" src={musicIcon} /></a>
            <a role="button" tabIndex={0} onClick={this.handlePhotosClick} id="photos" >
              <img className="icon" alt="icon" src={photosIcon} />
            </a>
            <a href="https://iamplus.com" target="_blank" rel="noopener noreferrer">
              <img className="icon" alt="icon" src={iamIcon} />
            </a>
            <a href="https://ill.i.am/" target="_blank" rel="noopener noreferrer">
              <img className="icon" alt="icon" src={illIcon} />
            </a>
            <a href="http://iamangelfoundation.org/" target="_blank" rel="noopener noreferrer">
              <img className="icon" alt="icon" src={angelIcon} />
            </a>
          </div>
        </div>
        <div className="screen">
          <div className="icon-wrapper">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" >
              <img className="icon" alt="icon" src={twitterIcon} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <img className="icon" alt="icon" src={facebookIcon} />
            </a>
            <a role="button" tabIndex={0} onClick={this.handlePhotosClick} >
              <img className="icon" alt="icon" src={instagramIcon} />
            </a>
          </div>
        </div>
      </Slider>
    );

    const homeFooter = (
      <div className="menu-bottom">
        <div className="icon-wrapper">
          <a role="button" tabIndex={0} onClick={this.handleMessagesClick} id="messages">
            <img className="icon" alt="icon" src={messagesIcon} />
          </a>
        </div>
      </div>
    );

    return (
      <div className="App">
        <div className="nav" />
        <div className="wrapper">
          <div className="phone-wrapper">
            <div className="crop">
              {/* Home Screen */}
              {this.state.isHomeDisplayed ? homeSlider : ''}
              {this.state.areMessagesDisplayed ? <Messages closeApp={this.handleMessagesClick} /> : ''}
              {this.state.isMusicDisplayed ? <Music closeApp={this.handleMusicClick} /> : ''}
              {this.state.arePhotosDisplayed ? <Photos closeApp={this.handlePhotosClick} /> : ''}
            </div>
            <div>
              {/* Footer */}
              {this.state.isHomeDisplayed ? homeFooter : ''}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
