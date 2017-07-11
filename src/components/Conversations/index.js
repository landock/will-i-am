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
	        centerContent={<img src={imgAvatarSrc}/>}
	        rightContent={<img src={infoIcon}/>}
	        onHeaderClick={this.onConversationHeaderClick}
        />
	      <svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" viewBox="0 0 291.24121 93.006249">
		      <defs>
			      <g>
				      <clipPath id="message-image-mask" clipPathUnits="objectBoundingBox">
					      <path
						      d="M291.24 93.006s-13.35-6.462-15.413-24.643v-9.94c.023-.205.02-.39 0-.553V24.198C275.827 10.888 264.94 0 251.63 0H24.2C10.89 0 0 10.89 0 24.198v44.61c0 13.31 10.89 24.198 24.2 24.198h227.43c5.68 0 10.906-1.995 15.046-5.3 10.596 4.494 24.565 5.3 24.565 5.3"
						      fill="#62bbf9"
						      transform="scale(0.003433580021179 0.010751965709315)"
					      />
				      </clipPath>
			      </g>
		      </defs>
	      </svg>
        {
          conversation.messages.map((message, index) => (
            <div key={index} className={`speech-bubble ${message.sender.toLowerCase()}`}>
              <p className="sender-name"><strong>{message.sender}</strong></p>
              <div className="message-wrap"><p>{message.body}</p></div>
	            {
		            message.message_image && (
			            <div style={{ textAlign: 'right', paddingRight: '35px' }}>
				            <img
					            style={{ clipPath: 'url(#message-image-mask)', WebkitClipPath: 'url(#message-image-mask)' }}
					            className="message-image"
					            src={message.message_image.xs.url}/>
			            </div>
		            )
	            }
            </div>
          ))
        }
      </div>
    );
  }
}
