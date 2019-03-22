import React, { Component } from "react";
import moment from "moment";

import AppFrame from "../AppFrame";

export default class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentNewsItem: null
    };
  }

  render() {
    const { newsItems } = this.props;
    const { currentNewsItem } = this.state;

    const momentConfig = {
      sameDay: "[Today]",
      nextDay: "[Tomorrow]",
      nextWeek: "[This] dddd",
      lastDay: "[Yesterday]",
      lastWeek: "[Last] dddd",
      sameElse: "DD/MM/YYYY"
    };
    const defaultContent = (
      <h4 className="unavailable">Sorry, news currently unavailable</h4>
    );

    const listNews =
      !newsItems || newsItems.length === 0
        ? defaultContent
        : newsItems.map(newsItem => (
            <li key={newsItem.id}>
              <div
                role="button"
                tabIndex={0}
                onClick={() => this.setState({ currentNewsItem: newsItem })}
              >
                {newsItem.featured_image.url && (
                  <img
                    style={{ width: "100%" }}
                    src={newsItem.featured_image.url}
                    alt={newsItem.featured_image.url}
                  />
                )}
                <p>
                  <strong>{newsItem.title}</strong>
                </p>
              </div>
            </li>
          ));

    const eventsList = (
      <div>
        <AppFrame title="News">
          <ul>{listNews}</ul>
        </AppFrame>
      </div>
    );

    const selectedNewsItem = currentNewsItem && (
      <AppFrame
        title="News - Article"
        onTitleClick={() => this.setState({ currentNewsItem: null })}
      >
        <div className="selected-news-wrapper">
          <h3>{currentNewsItem.title}</h3>
          <aside>
            Posted{" "}
            {moment(currentNewsItem.created_at).calendar(
              moment(),
              momentConfig
            )}
          </aside>
          {currentNewsItem.featured_image.url && (
            <img
              style={{ width: "100%" }}
              src={currentNewsItem.featured_image.url}
              alt={currentNewsItem.featured_image.url}
            />
          )}
          <p>{currentNewsItem.body}</p>
        </div>
      </AppFrame>
    );

    return (
      <div className="News">
        {currentNewsItem ? selectedNewsItem : eventsList}
      </div>
    );
  }
}
