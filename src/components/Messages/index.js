import React, { Component } from 'react';
import axios from 'axios';
import { List, ListItem, ListDivider } from 'react-toolbox/lib/list';
import Conversations from '../Conversations'

export default class Messages extends Component {

  constructor(props) {
	  super(props);
	  this.state = {
      conversations: [],
      conversationSelected: '',
      areConversationsDisplayed: false
    }
  }

  /*
  For now we'll just let each component manage it's data fetching but we'll  probably move this into a services layer at some point.
  */
  componentDidMount() {
	  let apiUrl = 'https://still-brushlands-60581.herokuapp.com/api/v1/conversations';
	  let mockApiUrl= 'https://private-830eb4-wiammessages.apiary-mock.com/conversations';
	  axios.get(apiUrl)
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

  handleConversationClick = (e, index) => {
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
          <div key={index}>
            <ListItem
              id={index}
              avatar=""
              caption={conversation.name}
              legend={conversation.messages[conversation.messages.length-1].body}
              onClick={(e) => this.handleConversationClick(e, index)}
            />
            <ListDivider />
          </div>
        );
      })
    );

    const renderSelectedConversations = (
      <div>
        {
          this.state.areConversationsDisplayed ?
          <Conversations
            conversation={this.state.conversations[this.state.conversationSelected]}
            backToMessages={(e) => this.handleConversationClick(e)}
          /> :
          ''
        }
      </div>
    );

    const renderListMessages = (
      <List selectable ripple>
        <div onClick={this.onMessagesHeaderClick}>
          <div className="tmpHeader"> <div className="arrow">{'<'}</div> <div className="messages-header-cp">Messages</div> </div>
        </div>

        { listMessages }
      </List>
    );

    return (
      <div className='message-list'>
        { this.state.areConversationsDisplayed ? '' : renderListMessages }

        { renderSelectedConversations }
      </div>
		);
	}
}
