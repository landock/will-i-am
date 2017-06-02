import React, { Component } from 'react';
import axios from 'axios';

export default class Messages extends Component {

  constructor(props) {
	  super(props);
	  this.state = {conversations:[]}

  }

  /*
  For now we'll just let each component manage it's data fetching but we'll
  probably move this into a services layer at some point.
  */
  componentDidMount() {
	  axios.get('https://private-830eb4-wiammessages.apiary-mock.com/conversations')
	  .then((data) => {
		  let conversations = data.data;
		  this.setState({
			  conversations: conversations
		  });
		  console.log(this.state);
	  })
	  .catch( error => console.log(error));

  }

  handleContactClick = (e) => {
	  e.preventDefault();
	  console.log(e);
  }

	render() {
	    return (

			<div className={'conv'}>
        <header><span className={'left'}></span><h2>Adele</h2></header>
      {
				 this.state.conversations.map( (conversation, idx) => {
					return (
						<div key={idx}>
							<h2><button onClick={this.handleContactClick}>{conversation.contact}</button></h2>
							{
								conversation.messages.map((message, idx) => {
									return (
										<div key={idx} className={message.sender}>
                      <p className={'sender-name'}>{message.sender}</p>
                      <div className={'message-wrap'}>
											<p>{message.message}</p>
                      </div>
										</div>
									)
								})
							}
						</div>
					)
				})
			} </div>
		);
	}
}
