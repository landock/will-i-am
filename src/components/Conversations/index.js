import React, { Component } from 'react';

export default class Conversations extends Component {
  onConversationHeaderClick = (e) => {
    this.props.backToMessages(e);
  }

  render() {
    return(
      <div>
        <div onClick={(e)=>this.onConversationHeaderClick(e)}>
          <div className="tmpHeader"> {'<'} Messages </div>
        </div>

        {this.props.conversation.messages.map((message, index)=>{
          return (
            <div key={index} className={message.sender}>
              <p className={'sender-name'}>{message.sender}</p>
              <div className={'message-wrap'}>
                <p>{message.message}</p>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}