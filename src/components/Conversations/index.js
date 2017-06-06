import React, { Component } from 'react';
import AppHeader from '../AppHeader';

export default class Conversations extends Component {
  onConversationHeaderClick(e) {
    this.props.backToMessages(e);
  }

  render() {
    return (
      <div className="Conversations">
        <AppHeader name="Conversations" onHeaderClick={e => this.onConversationHeaderClick(e)} />
        {
          this.props.conversation.messages.map((message, index) => (
            <div key={index} className={`speech-bubble ${message.sender.toLowerCase()}`}>
              <p className={'sender-name'}>{message.sender}</p>
              <div className={'message-wrap'}><p>{message.body}</p></div>
            </div>
          ))
        }
      </div>
    );
  }
}
