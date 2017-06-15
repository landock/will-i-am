import React, { Component } from 'react';
import AppHeader from '../AppHeader';

import imgAvatarSrc from '../../images/avatar-default.svg';
import infoIcon from '../../images/info-icon.svg';

export default class Conversations extends Component {
  constructor(props) {
    super(props);
    this.onConversationHeaderClick = this.onConversationHeaderClick.bind(this);
  }

  onConversationHeaderClick(e) {
    this.props.backToMessages(e);
  }

  render() {
    const { conversation } = this.props;
    return (
      <div className="Conversations">
        <AppHeader
	        title={conversation.name}
	        centerImageSrc={imgAvatarSrc}
	        rightImageSrc={infoIcon}
	        onHeaderClick={this.onConversationHeaderClick}
        />
        {
          conversation.messages.map((message, index) => (
            <div key={index} className={`speech-bubble ${message.sender.toLowerCase()}`}>
              <p className="sender-name"><strong>{message.sender}</strong></p>
              <div className="message-wrap"><p>{message.body}</p></div>
            </div>
          ))
        }
      </div>
    );
  }
}
