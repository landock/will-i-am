import React, { Component } from 'react';
import axios from 'axios';
import Conversations from '../Conversations/';
import AppHeader from '../AppHeader';

export default class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conversations: [],
      conversationSelected: '',
      areConversationsDisplayed: false,
    };

    this.onMessagesHeaderClick = this.onMessagesHeaderClick.bind(this);
    this.onConversationClick = this.onConversationClick.bind(this);
  }

  componentDidMount() {
    const apiUrl = 'https://still-brushlands-60581.herokuapp.com/api/v1/conversations';
    const mockApiUrl = 'https://private-830eb4-wiammessages.apiary-mock.com/conversations';

    axios.get(apiUrl)
    .then((data) => {
      const conversations = data.data;
      this.setState({
        conversations,
      });
    })
    .catch(error => console.log(error));
  }

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
    const listMessages = (
      this.state.conversations.map((conversation, index) => (
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
              conversation={this.state.conversations[this.state.conversationSelected]}
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
