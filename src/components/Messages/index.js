import React, { Component } from "react";
import moment from "moment";

import Conversations from "../Conversations/";
import AppFrame from "../AppFrame";

import imgAvatarSrc from "../../images/avatar-default.svg";
import imgMessageFooter from "../../images/message-footer.svg";
import pencilIcon from "../../images/pencil-icon.svg";

export default class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conversationSelected: "",
      areConversationsDisplayed: false
    };

    this.onMessagesHeaderClick = this.onMessagesHeaderClick.bind(this);
    this.onConversationClick = this.onConversationClick.bind(this);
  }

  onMessagesHeaderClick(e) {
    this.props.closeApp(e);
  }

  onConversationClick(e, index) {
    e.preventDefault();
    this.setState({
      areConversationsDisplayed: !this.state.areConversationsDisplayed,
      conversationSelected: index
    });
  }

  render() {
    const { conversations } = this.props;

    const momentConfig = {
      sameDay: "h:mm A",
      lastDay: "[Yesterday]",
      lastWeek: "dddd",
      sameElse: "MM/DD/YY"
    };

    const defaultContent = (
      <h4 className="unavailable">Sorry, messages currently unavailable.</h4>
    );
    const listMessages =
      !conversations || conversations.length === 0
        ? defaultContent
        : conversations.map((conversation, index) => {
            if (conversation.messages.length === 0) return null;

            let summary =
              conversation.messages[conversation.messages.length - 1];
            return (
              <li className="conversation" key={index}>
                <div className="avatar-icon">
                  <img alt={imgAvatarSrc} src={imgAvatarSrc} />
                </div>
                <div
                  className="message-info"
                  role="button"
                  tabIndex={0}
                  onClick={e => this.onConversationClick(e, index)}
                >
                  <div className="name-arrow-wrap">
                    <p>
                      <strong>{conversation.name}</strong>
                    </p>
                    <p className="message-time">
                      {moment(conversation.created_at).calendar(
                        moment(),
                        momentConfig
                      )}
                      <i className="fa fa-angle-right" aria-hidden="true" />
                    </p>
                  </div>
                  <aside>{summary && summary.body}</aside>
                </div>
                <hr />
              </li>
            );
          });

    const renderSelectedConversations = this.state
      .areConversationsDisplayed && (
      <div className="selected-conversation">
        <Conversations
          conversation={conversations[this.state.conversationSelected]}
          handleClick={this.onConversationClick}
        />
      </div>
    );

    const renderListMessages = !this.state.areConversationsDisplayed && (
      <ul>{listMessages}</ul>
    );

    return (
      <AppFrame
        title="messages"
        appClassName="Messages"
        rightImageSrc={pencilIcon}
        onHeaderClick={this.props.onHeaderClick}
      >
        <div className="message-list">
          {renderListMessages}
          {renderSelectedConversations}
          <div className="message-footer">
            <img alt={imgMessageFooter} src={imgMessageFooter} />
          </div>
        </div>
      </AppFrame>
    );
  }
}
