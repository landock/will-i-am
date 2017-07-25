import React, { Component } from 'react';

import AppFrame from '../AppFrame';
import ee from '../../EventEmitter'

import imgAvatarSrc from '../../images/avatar-default.svg';
import infoIcon from '../../images/info-icon.svg';

export default class Conversations extends Component {
  constructor(props) {
    super(props);
    this.ee = ee;
  }

  render() {
    const { conversation, handleClick } = this.props;
    return (
      <AppFrame
	appClassName="Conversation"
	onTitleClick={handleClick}
	title={conversation.name}
	centerContent={<img alt={imgAvatarSrc} src={imgAvatarSrc} />}
	rightContent={<img src={infoIcon} alt={infoIcon} />}
      >
	{
	  conversation.messages.map((message, index) => {
	    const messageClassName = 'speech-bubble ' + message.sender.toLowerCase();

	    return (
	      <div key={index} className={messageClassName} >
		<p className="sender-name">
		  <strong>{message.sender}</strong>
		</p>
		<div className="message-wrap">
		  <p>{message.body}</p>
		</div>
		{
		  message.message_image && (
		   <img alt={message.message_image.url} className="message-image" src={ message.message_image.xs.url } />
		  )
		}
	      </div>
	    );
	  })
	}
      </AppFrame>
    );
  }
}
