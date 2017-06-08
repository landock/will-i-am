import React, { Component } from 'react';
import Slider from 'react-slick';

//components
import Messages from './components/Messages';
import Music from './components/Music';
import Photos from './components/Photos';
import Facebook from './components/Facebook';
import Instagram from './components/Instagram';
import Twitter from './components/Twitter';

// services
import { fetchImages } from './api/flickr';
import { fetchMessages } from './api/messages';
import { fetchInstagram } from './api/instagram';

//image imports
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

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      media: [],
      instagramMedia: [],
      userProfile: null,
      conversations: [],
      isHomeDisplayed: true,
      areMessagesDisplayed: false,
      isMusicDisplayed: false,
      arePhotosDisplayed: false,
      isFacebookDisplayed: false,
      isInstagramDisplayed: false,
      isTwitterDisplayed: false,
    };

    this.handleMessagesClick = this.handleMessagesClick.bind(this);
    this.handleMusicClick = this.handleMusicClick.bind(this);
    this.handlePhotosClick = this.handlePhotosClick.bind(this);
    this.handleFacebookClick = this.handleFacebookClick.bind(this);
    this.handleInstagramClick = this.handleInstagramClick.bind(this);
    this.handleTwitterClick = this.handleTwitterClick.bind(this);
  }

  componentDidMount() {
    fetchImages()
      .then(mediaUrls => this.setState({ media: mediaUrls }))
      .catch(err => console.log(`Fetch Images Error: ${err}`));

    fetchMessages()
      .then(conversations => this.setState({ conversations }))
      .catch(err => console.log(`Fetch Messages Error: ${err}`));

    fetchInstagram()
      .then((response) => {
        response.items.splice(-2, 2); //limit array to 18 items so they all fit in the screen

        this.setState({
          instagramMedia: response.items,
          userProfile: response.items[0].user,
        });
      })
      .catch(err => console.log(`Fetch Images Error: ${err}`));
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

  handleFacebookClick() {
    this.setState({
      isHomeDisplayed: !this.state.isHomeDisplayed,
      isFacebookDisplayed: !this.state.isFacebookDisplayed,
    });
  }

  handleInstagramClick() {
    this.setState({
      isHomeDisplayed: !this.state.isHomeDisplayed,
      isInstagramDisplayed: !this.state.isInstagramDisplayed,
    });
  }

  handleTwitterClick() {
    this.setState({
      isHomeDisplayed: !this.state.isHomeDisplayed,
      isTwitterDisplayed: !this.state.isTwitterDisplayed,
    });
  }

  render() {
    const homeSlider = (
      <Slider {...settings} class="slider">
        <div className="screen">
          <div className="icon-wrapper">
            <a role="button" tabIndex={0} onClick={this.handleInstagramClick} id="instagram">
              <img className="icon" alt="icon" src={instagramIcon} />
            </a>
            <a role="button" tabIndex={0} onClick={this.handleFacebookClick} id="facebook">
              <img className="icon" alt="icon" src={facebookIcon} />
            </a>
            <a role="button" tabIndex={0} onClick={this.handleTwitterClick} id="twitter">
              <img className="icon" alt="icon" src={twitterIcon} />
            </a>
            <a role="button" tabIndex={0} onClick={this.handleMusicClick} id="music" >
              <img className="icon" alt="icon" src={musicIcon} />
            </a>
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
          <div className="icon-wrapper" />
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

    const {
      isHomeDisplayed,
      areMessagesDisplayed,
      isMusicDisplayed,
      arePhotosDisplayed,
      isFacebookDisplayed,
      isInstagramDisplayed,
      isTwitterDisplayed,
      instagramMedia,
      media,
      conversations,
      userProfile
    } = this.state;

    return (
      <div className="App">
        <div className="nav" />
        <div className="wrapper">
          <div className="phone-wrapper">
            <div className="crop">
              {/* Home Screen */}
              {isHomeDisplayed ? homeSlider : ''}
              {
                areMessagesDisplayed
                  ? <Messages conversations={conversations} closeApp={this.handleMessagesClick} />
                  : ''
              }
              {
                isMusicDisplayed
                  ? <Music closeApp={this.handleMusicClick} />
                  : ''
              }
              {
                arePhotosDisplayed
                  ? <Photos media={media} closeApp={this.handlePhotosClick} />
                  : ''
              }
              {
                isFacebookDisplayed
                  ? <Facebook closeApp={this.handleFacebookClick} />
                  : ''
              }
              {
                isInstagramDisplayed
                  ? <Instagram media={instagramMedia} userProfile={userProfile} closeApp={this.handleInstagramClick} />
                  : ''
                }
              {
                isTwitterDisplayed
                  ? <Twitter closeApp={this.handleTwitterClick} />
                  : ''
              }
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
