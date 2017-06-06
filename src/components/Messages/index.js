import React, { Component } from 'react';
import axios from 'axios';
import { List, ListItem, ListDivider } from 'react-toolbox/lib/list';
import Conversations from '../Conversations'
import AppHeader from '../AppHeader';

export default class Messages extends Component {
  constructor(props) {
	  super(props);
	  this.state = {
      conversations: [],
      conversationSelected: '',
      areConversationsDisplayed: false
  };

    this.onMessagesHeaderClick = this.onMessagesHeaderClick.bind(this);
    this.onConversationClick = this.onConversationClick.bind(this);
  }

  componentDidMount() {
	  let apiUrl = 'https://still-brushlands-60581.herokuapp.com/api/v1/conversations';
	  let mockApiUrl= 'https://private-830eb4-wiammessages.apiary-mock.com/conversations';

		axios.get(mockApiUrl)
	  .then((data) => {
		  let conversations = data.data;
		  this.setState({
			  conversations: conversations
		  });
	  })
	  .catch( error => console.log(error));
  }

  onMessagesHeaderClick = (e) => {
    this.props.closeApp(e);
  }

  onConversationClick = (e, index) => {
	  e.preventDefault();
	this.setState({
		areConversationsDisplayed: !this.state.areConversationsDisplayed,
		conversationSelected: index
	});
  }

	render() {
	    const listMessages = (
			this.state.conversations.map((conversation, index) => {
				return(
					<div className="conversation-list" key={index}>
            <ListItem
              id={index}
              avatar=""
              caption={conversation.name}
              legend={conversation.messages[conversation.messages.length-1].body}
							onClick={ (e) => this.onConversationClick(e, index)}
            />
            <ListDivider />
          </div>
				);
			})
	    );

	    const renderSelectedConversations = (
	      <div className="selected-conversation">
	        {
	          this.state.areConversationsDisplayed ?
			  <Conversations
	            conversation={this.state.conversations[this.state.conversationSelected]}
	            backToMessages={(e) => this.onConversationClick(e)}
	          /> :
			  ''
	        }
	      </div>
	    );

	    const renderListMessages = (
			<List selectable ripple >
				<AppHeader name="messages" onHeaderClick={this.onMessagesHeaderClick} />
		      { listMessages }
      </List>
	    );

	    return (
	      <div className={'message-list'}>
	        { this.state.areConversationsDisplayed ? '' : renderListMessages }
	        { renderSelectedConversations }
	      </div>
		);
	}
}
