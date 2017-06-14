import React, { Component } from 'react';
import moment from 'moment';

import Conversations from '../Conversations/';
import AppHeader from '../AppHeader';

import imgAvatarSrc from '../../images/avatar-default.svg';

export default class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conversationSelected: '',
      areConversationsDisplayed: false,
    };

    this.onMessagesHeaderClick = this.onMessagesHeaderClick.bind(this);
    this.onConversationClick = this.onConversationClick.bind(this);
  }

  componentDidMount() {}

  onMessagesHeaderClick(e) {
    this.props.closeApp(e);
  }

  onConversationClick(e, index) {
    e.preventDefault();
    this.setState({
      areConversationsDisplayed: !this.state.areConversationsDisplayed,
      conversationSelected: index,
    });
  }


  render() {
		const momentConfig = {
			sameDay: '[Today]',
			nextDay: '[Yesterday]',
			nextWeek: 'dddd',
			lastDay: '[Yesterday]',
			lastWeek: '[Last] dddd',
			sameElse: 'MM/DD/YYYY'
		};
    const { conversations } = this.props;
    const listMessages = (
      conversations.map((conversation, index) => (
        <li className="conversation" key={index}>
        <div className="avatar-icon"><img alt={imgAvatarSrc} src={imgAvatarSrc} /></div>
          <div className="message-info" role="button" tabIndex={0} onClick={e => this.onConversationClick(e, index)}>
            <div className="name-arrow-wrap">
            <p><strong>{conversation.name}</strong></p>
							<p className="message-time">{moment().calendar(conversation.created_at, momentConfig)} <i
								className="fa fa-angle-right" aria-hidden="true"></i></p>
            </div>

            <aside>{conversation.messages[conversation.messages.length - 1].body}</aside>

          </div>
          <hr />
        </li>
      ))
    );

    const renderSelectedConversations = (
      <div className="selected-conversation">
        {
          this.state.areConversationsDisplayed ?
            <Conversations
              conversation={conversations[this.state.conversationSelected]}
              backToMessages={e => this.onConversationClick(e)}
            /> :
          ''
        }
      </div>
    );

    const renderListMessages = (
      <div>
        <AppHeader name="messages" onHeaderClick={this.onMessagesHeaderClick} />
        <ul>{ listMessages }</ul>
      </div>
    );

    return (
      <div className={'message-list'}>
        { this.state.areConversationsDisplayed ? '' : renderListMessages }
        { renderSelectedConversations }
      </div>
    );
  }
}
