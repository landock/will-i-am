import React, { Component } from 'react';
import Conversations from '../Conversations/';
import AppHeader from '../AppHeader';

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
    const { conversations } = this.props;
    const listMessages = (
      conversations.map((conversation, index) => (
        <li className="conversation" key={index}>
          <div role="button" tabIndex={0} onClick={e => this.onConversationClick(e, index)}>
            <p><strong>{conversation.name}</strong></p>
            <aside>{conversation.messages[conversation.messages.length - 1].body}</aside>
            <hr />
          </div>
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
